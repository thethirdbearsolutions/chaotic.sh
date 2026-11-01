"""The Web Push sender (CHT-1605): app.services.push_sender.

* The body is RFC 8291 aes128gcm: RFC 8291's own test vector, and a
  round trip through a receiver written from the RFC.
* Every request carries a valid VAPID (RFC 8292) header for the push
  service's origin.
* New inbox entries are pushed to the recipient's live devices, after
  the writer's transaction commits, never to whoever caused them, and
  only for kinds the person wants; every resolve path sends a
  ``resolved`` message.
* 404/410 delete the device; 429/5xx/network errors retry and then count
  a failure; other refusals count a failure.
* Dead devices (expired or revoked credential, old VAPID key, inactive
  user) get nothing, and the endpoint policy is applied again at send
  time, connecting to the vetted address.
"""
import asyncio
import base64
import json
import os
import struct
from datetime import datetime, timedelta, timezone

import httpx
import pytest
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives.asymmetric.utils import encode_dss_signature
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.hkdf import HKDF

from app.config import get_settings
from app.db.transactions import atomic
from app.enums import InboxEntryKind, TeamRole
from app.oxyde_models.api_key import OxydeAPIKey
from app.oxyde_models.inbox import OxydeInboxEntry
from app.oxyde_models.push import OxydePushDevice
from app.oxyde_models.team import OxydeTeamMember
from app.oxyde_models.user import OxydeUser
from app.schemas.api_key import APIKeyCreate
from app.services import push_sender, push_service
from app.services.api_key_service import APIKeyService
from app.services.inbox_service import InboxService
from app.services.push_service import PushService
from app.utils import vapid

PUBLIC_IP = "93.184.216.34"
ENDPOINT = "https://ntfy.example.net/upAbC123"


def _b64(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode()


def _unb64(value: str) -> bytes:
    return base64.urlsafe_b64decode(value + "=" * (-len(value) % 4))


@pytest.fixture(autouse=True)
def fake_dns(monkeypatch):
    table = {
        "ntfy.example.net": [PUBLIC_IP],
        "intranet.example.net": ["10.0.0.5"],
    }

    async def resolve(host: str) -> list[str]:
        if host not in table:
            raise push_service._invalid("the endpoint URL's host does not resolve")
        return table[host]

    monkeypatch.setattr(push_service, "_resolve", resolve)
    return table


class FakePushService:
    """An httpx transport standing in for the push service: records each
    request and answers from a script (the last answer repeats)."""

    def __init__(self, *answers):
        self.answers = list(answers) or [201]
        self.requests: list[httpx.Request] = []

    def __call__(self, request: httpx.Request) -> httpx.Response:
        self.requests.append(request)
        answer = self.answers.pop(0) if len(self.answers) > 1 else self.answers[0]
        if isinstance(answer, Exception):
            raise answer
        if isinstance(answer, tuple):
            return httpx.Response(answer[0], headers=answer[1])
        return httpx.Response(answer)


@pytest.fixture
def push(db, monkeypatch):
    fake = FakePushService()
    monkeypatch.setattr(push_sender, "_transport", httpx.MockTransport(fake))
    monkeypatch.setattr(push_sender, "RETRY_DELAYS_SECONDS", (0.0, 0.0))
    yield fake


class Phone:
    """A device's own keys, so a test can read what it was sent."""

    def __init__(self):
        self.key = ec.generate_private_key(ec.SECP256R1())
        self.auth = os.urandom(16)
        self.p256dh = self.key.public_key().public_bytes(
            serialization.Encoding.X962, serialization.PublicFormat.UncompressedPoint,
        )

    def decrypt(self, body: bytes) -> bytes:
        return receive(body, self.key, self.auth)

    def read(self, request: httpx.Request) -> dict:
        return json.loads(self.decrypt(request.content))


def receive(body: bytes, ua_key: ec.EllipticCurvePrivateKey, auth: bytes) -> bytes:
    """RFC 8291 section 3.4 and RFC 8188 from the receiving side."""
    salt, (rs, idlen) = body[:16], struct.unpack("!IB", body[16:21])
    as_public = body[21:21 + idlen]
    record = body[21 + idlen:]
    assert len(record) <= rs
    ua_public = ua_key.public_key().public_bytes(
        serialization.Encoding.X962, serialization.PublicFormat.UncompressedPoint,
    )
    shared = ua_key.exchange(ec.ECDH(), ec.EllipticCurvePublicKey.from_encoded_point(ec.SECP256R1(), as_public))

    def hkdf(s, ikm, info, n):
        return HKDF(algorithm=hashes.SHA256(), length=n, salt=s, info=info).derive(ikm)

    ikm = hkdf(auth, shared, b"WebPush: info\x00" + ua_public + as_public, 32)
    cek = hkdf(salt, ikm, b"Content-Encoding: aes128gcm\x00", 16)
    nonce = hkdf(salt, ikm, b"Content-Encoding: nonce\x00", 12)
    plain = AESGCM(cek).decrypt(nonce, record, None).rstrip(b"\x00")
    assert plain.endswith(b"\x02")
    return plain[:-1]


async def _device(user, phone: Phone, endpoint: str = ENDPOINT, **fields) -> OxydePushDevice:
    values = dict(
        user_id=user.id, installation_id=os.urandom(8).hex(), endpoint=endpoint,
        p256dh=_b64(phone.p256dh), auth=_b64(phone.auth), vapid_key_id=vapid.key_id(),
    )
    values.update(fields)
    return await OxydePushDevice.objects.create(**values)


async def _assign(test_issue, test_project, assignee, actor):
    await InboxService().notify_assignment(
        issue=test_issue, project=test_project, assignee_id=assignee.id, assigned_by=actor,
    )
    await push_sender.drain()


# --- RFC 8291 / RFC 8292 ------------------------------------------------------


class TestEncryption:
    def test_rfc8291_test_vector(self):
        """RFC 8291 Appendix A, byte for byte."""
        sender = ec.derive_private_key(
            int.from_bytes(_unb64("yfWPiYE-n46HLnH0KqZOF1fJJU3MYrct3AELtAQ-oRw"), "big"), ec.SECP256R1(),
        )
        body = push_sender.encrypt(
            b"When I grow up, I want to be a watermelon",
            _unb64("BCVxsr7N_eNgVRqvHtD0zTZsEc6-VV-JvLexhqUzORcxaOzi6-AYWXvTBHm4bjyPjs7Vd8pZGH6SRpkNtoIAiw4"),
            _unb64("BTBZMqHH6r4Tts7J_aSIgg"),
            sender_key=sender, salt=_unb64("DGv6ra1nlYgDCS1FRnbzlw"),
        )
        assert _b64(body) == (
            "DGv6ra1nlYgDCS1FRnbzlwAAEABBBP4z9KsN6nGRTbVYI_c7VJSPQTBtkgcy27mlmlMoZIIgDll6e3vCYLocInmYWAmS6Tlz"
            "AC8wEqKK6PBru3jl7A_yl95bQpu6cVPTpK4Mqgkf1CXztLVBSt2Ks3oZwbuwXPXLWyouBWLVWGNWQexSgSxsj_Qulcy4a-fN"
        )

    def test_round_trip_with_fresh_keys(self):
        phone = Phone()
        one = push_sender.encrypt(b'{"hello":"world"}', phone.p256dh, phone.auth)
        two = push_sender.encrypt(b'{"hello":"world"}', phone.p256dh, phone.auth)
        assert one != two  # a fresh salt and ephemeral key each time
        assert phone.decrypt(one) == phone.decrypt(two) == b'{"hello":"world"}'

    def test_the_body_must_fit_4096_bytes(self):
        """RFC 8291 section 4 bounds the whole body, header included: 86
        bytes of header, the delimiter and the tag leave 3993."""
        phone = Phone()
        assert len(push_sender.encrypt(b"x" * 3993, phone.p256dh, phone.auth)) == 4096
        with pytest.raises(ValueError):
            push_sender.encrypt(b"x" * 3994, phone.p256dh, phone.auth)

    def test_urandom_only_for_the_salt(self):
        """The log-redaction guard allowlists os.urandom for this whole
        file (PR #357 review, finding 12); this keeps it to the salt."""
        import ast
        import inspect

        tree = ast.parse(inspect.getsource(push_sender))
        users = {
            fn.name for fn in ast.walk(tree) if isinstance(fn, (ast.FunctionDef, ast.AsyncFunctionDef))
            for node in ast.walk(fn)
            if isinstance(node, ast.Attribute) and node.attr == "urandom"
        }
        assert users == {"_salt"}


class TestVapid:
    def test_header_verifies_against_the_public_key(self):
        push_sender._vapid_tokens.clear()
        header = push_sender.vapid_authorization("https://ntfy.example.net", now=1_000_000)
        scheme, rest = header.split(" ", 1)
        params = dict(p.strip().split("=", 1) for p in rest.split(","))
        assert scheme == "vapid"
        assert params["k"] == vapid.public_key_b64url()
        head, body, sig = params["t"].split(".")
        assert json.loads(_unb64(head)) == {"typ": "JWT", "alg": "ES256"}
        claims = json.loads(_unb64(body))
        assert claims["aud"] == "https://ntfy.example.net"
        assert 0 < claims["exp"] - 1_000_000 <= 24 * 3600
        raw = _unb64(sig)
        public = ec.EllipticCurvePublicKey.from_encoded_point(ec.SECP256R1(), _unb64(params["k"]))
        public.verify(
            encode_dss_signature(int.from_bytes(raw[:32], "big"), int.from_bytes(raw[32:], "big")),
            f"{head}.{body}".encode(), ec.ECDSA(hashes.SHA256()),
        )
        # Reused while fresh, renewed near expiry.
        assert push_sender.vapid_authorization("https://ntfy.example.net", now=1_000_100) == header
        assert push_sender.vapid_authorization("https://ntfy.example.net", now=1_000_000 + 11.5 * 3600) != header
        # Expired tokens of other audiences are dropped, not kept forever.
        push_sender.vapid_authorization("https://other.example", now=1_000_000)
        push_sender.vapid_authorization("https://third.example", now=1_000_000 + 30 * 3600)
        assert {aud for _, aud in push_sender._vapid_tokens} == {"https://third.example"}

    @pytest.mark.parametrize("env, expected", [
        ({"APP_BASE_URL": "https://chaotic.example.org/"}, "https://chaotic.example.org"),
        ({"APP_BASE_URL": "http://localhost:24267"}, None),
        ({"VAPID_SUBJECT": "mailto:ops@example.org", "APP_BASE_URL": "https://c.example"}, "mailto:ops@example.org"),
        ({"VAPID_SUBJECT": "ops@example.org", "APP_BASE_URL": "https://c.example"}, "https://c.example"),
    ])
    def test_subject(self, monkeypatch, env, expected):
        push_sender._vapid_tokens.clear()
        for name, value in env.items():
            monkeypatch.setenv(name, value)
        get_settings.cache_clear()
        try:
            token = push_sender.vapid_authorization("https://a.example", now=5).split("t=")[1].split(",")[0]
            assert json.loads(_unb64(token.split(".")[1])).get("sub") == expected
        finally:
            get_settings.cache_clear()
            push_sender._vapid_tokens.clear()

    def test_topic_is_32_base64url_characters(self):
        t = push_sender.topic("some-entry-id")
        assert len(t) == 32 and set(t) <= set("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_")


# --- delivery -----------------------------------------------------------------


class TestDelivery:
    async def test_assignment_reaches_the_device(self, push, test_user, test_user2, test_issue, test_project):
        phone = Phone()
        device = await _device(test_user, phone)
        await OxydePushDevice.objects.filter(id=device.id).update(failure_count=2)
        await _assign(test_issue, test_project, test_user, test_user2)

        [request] = push.requests
        # Pinned to the vetted address; the name stays for Host and SNI.
        assert request.url.host == PUBLIC_IP and request.url.port in (None, 443)
        assert request.url.path == "/upAbC123"
        assert request.headers["host"] == "ntfy.example.net"
        assert request.extensions["sni_hostname"] == "ntfy.example.net"
        assert request.headers["content-encoding"] == "aes128gcm"
        assert request.headers["ttl"] == str(push_sender.TTL_SECONDS)
        assert request.headers["authorization"].startswith("vapid t=")
        entry = await OxydeInboxEntry.objects.get(recipient_user_id=test_user.id)
        assert request.headers["topic"] == push_sender.topic(entry.id)
        assert len(request.content) <= 4096

        payload = phone.read(request)
        assert payload == {
            "v": 1, "type": "entry", "id": entry.id, "kind": "assignment",
            "issue": test_issue.identifier, "title": entry.title, "ritual_id": None,
            "collapse": f"issue:{test_issue.id}",
        }
        row = await OxydePushDevice.objects.get(id=device.id)
        assert row.failure_count == 0 and row.last_success_at is not None

    async def test_no_device_means_no_task(self, push, test_user, test_user2, test_issue, test_project):
        await InboxService().notify_assignment(
            issue=test_issue, project=test_project, assignee_id=test_user.id, assigned_by=test_user2,
        )
        assert not push_sender._tasks
        assert push.requests == []

    async def test_long_titles_are_truncated(self, push, test_user, test_issue):
        phone = Phone()
        await _device(test_user, phone)
        entry = await OxydeInboxEntry.objects.create(
            recipient_user_id=test_user.id, kind=InboxEntryKind.MENTION, team_id=(await _team_of(test_user)),
            issue_id=test_issue.id, title="t" * 5000,
        )
        await push_sender.push_created([entry])
        await push_sender.drain()
        payload = phone.read(push.requests[0])
        assert len(payload["title"]) == push_sender.MAX_TITLE_CHARS

    async def test_not_to_the_person_who_caused_it(
        self, push, test_user, test_team, test_issue, test_project, gate_close_ritual,
    ):
        await _device(test_user, Phone())
        # test_user is the team's only admin and asked for the gate.
        await InboxService().notify_gate_pending(
            ritual=gate_close_ritual, issue=test_issue, project=test_project,
            requested_by_name="me", requested_by_id=test_user.id,
        )
        await push_sender.drain()
        assert await OxydeInboxEntry.objects.filter(recipient_user_id=test_user.id).count() == 1
        assert push.requests == []

    async def test_gate_pending_for_another_admin_is_urgent(
        self, push, test_user, test_user2, test_team, test_issue, test_project, gate_close_ritual,
    ):
        phone = Phone()
        await _device(test_user, phone)
        await InboxService().notify_gate_pending(
            ritual=gate_close_ritual, issue=test_issue, project=test_project,
            requested_by_name="Two", requested_by_id=test_user2.id,
        )
        await push_sender.drain()
        [request] = push.requests
        assert request.headers["urgency"] == "high"
        payload = phone.read(request)
        assert (payload["kind"], payload["ritual_id"]) == ("gate_pending", gate_close_ritual.id)

    async def test_preferences_are_honoured(self, push, test_user, test_user2, test_issue, test_project):
        await _device(test_user, Phone())
        await PushService().set_preferences(test_user.id, {InboxEntryKind.ASSIGNMENT: False})
        await _assign(test_issue, test_project, test_user, test_user2)
        assert push.requests == []

    async def test_device_added_notice_is_pushed_to_the_person(self, push, test_user, test_team):
        """The registrant is the recipient here, but the notice exists for
        a device they did not add, so it is pushed anyway."""
        phone = Phone()
        await PushService().register(
            test_user.id, "inst-1",
            push_service.Registration(endpoint=ENDPOINT, p256dh=_b64(phone.p256dh), auth=_b64(phone.auth)),
            holder_session_id=None, credential_id=None, credential_expires_at=None,
        )
        await push_sender.drain()
        assert phone.read(push.requests[0])["kind"] == "push_device_added"

    async def test_device_added_notice_ignores_a_stored_off(self, push, test_user, test_team):
        """A row turning it off (written before this rule, or by hand)
        does not mute it (PR #357 review, finding 4)."""
        from app.oxyde_models.push import OxydePushPreference

        await OxydePushPreference.objects.create(
            user_id=test_user.id, kind=InboxEntryKind.PUSH_DEVICE_ADDED, enabled=False,
        )
        phone = Phone()
        await PushService().register(
            test_user.id, "inst-1",
            push_service.Registration(endpoint=ENDPOINT, p256dh=_b64(phone.p256dh), auth=_b64(phone.auth)),
            holder_session_id=None, credential_id=None, credential_expires_at=None,
        )
        await push_sender.drain()
        assert phone.read(push.requests[0])["kind"] == "push_device_added"

    async def test_read_entries_are_not_pushed(self, push, test_user, test_issue):
        await _device(test_user, Phone())
        entry = await OxydeInboxEntry.objects.create(
            recipient_user_id=test_user.id, kind=InboxEntryKind.MENTION, team_id=(await _team_of(test_user)),
            title="x", read_at=datetime.now(timezone.utc),
        )
        await push_sender.push_created([entry])
        await push_sender.drain()
        assert push.requests == []


async def _team_of(user) -> str:
    return (await OxydeTeamMember.objects.filter(user_id=user.id).first()).team_id


class TestAfterCommit:
    async def test_sent_only_after_the_transaction_commits(
        self, push, test_user, test_user2, test_issue, test_project,
    ):
        await _device(test_user, Phone())
        async with atomic():
            await InboxService().notify_assignment(
                issue=test_issue, project=test_project, assignee_id=test_user.id, assigned_by=test_user2,
            )
            await push_sender.drain()
            assert push.requests == [] and not push_sender._tasks
        await push_sender.drain()
        assert len(push.requests) == 1

    async def test_one_dispatch_per_transaction(
        self, push, monkeypatch, test_user, test_user2, test_issue, test_project,
    ):
        """PR #357 review, finding 8: many writes, one task."""
        await _device(test_user, Phone())
        spawned = []
        real = push_sender._spawn
        monkeypatch.setattr(push_sender, "_spawn", lambda coro: (spawned.append(1), real(coro)))
        async with atomic():
            for _ in range(20):
                await InboxService().notify_assignment(
                    issue=test_issue, project=test_project, assignee_id=test_user.id, assigned_by=test_user2,
                )
        await push_sender.drain()
        assert len(spawned) == 1
        assert len(push.requests) == 20

    async def test_a_rolled_back_entry_is_not_sent(
        self, push, test_user, test_user2, test_issue, test_project,
    ):
        await _device(test_user, Phone())
        with pytest.raises(RuntimeError):
            async with atomic():
                await InboxService().notify_assignment(
                    issue=test_issue, project=test_project, assignee_id=test_user.id, assigned_by=test_user2,
                )
                raise RuntimeError("roll back")
        await push_sender.drain()
        assert await OxydeInboxEntry.objects.count() == 0
        assert push.requests == []

    async def test_a_rolled_back_resolve_is_not_sent(
        self, push, test_user, test_user2, test_team, test_issue, test_project, gate_close_ritual,
    ):
        await _device(test_user, Phone())
        await InboxService().notify_gate_pending(
            ritual=gate_close_ritual, issue=test_issue, project=test_project,
            requested_by_name="Two", requested_by_id=test_user2.id,
        )
        await push_sender.drain()
        push.requests.clear()
        with pytest.raises(RuntimeError):
            async with atomic():
                await InboxService().resolve_gate_or_review(ritual_id=gate_close_ritual.id, issue_id=test_issue.id)
                raise RuntimeError("roll back")
        await push_sender.drain()
        assert push.requests == []

    async def test_slow_commit_on_a_pool(
        self, push, monkeypatch, test_user, test_user2, test_issue, test_project,
    ):
        """PR #357 review, finding 1: with several connections a reader
        does not wait for a commit in progress. Nothing may be read, and
        nothing skipped, until the commit has returned."""
        import oxyde.db.transaction as oxyde_tx
        from oxyde import AsyncDatabase, PoolSettings, disconnect_all

        await _device(test_user, Phone())
        url = os.environ["DATABASE_URL"].replace("sqlite+aiosqlite://", "sqlite://")
        await disconnect_all()
        pool = AsyncDatabase(url, overwrite=True, settings=PoolSettings(max_connections=4))
        await pool.connect()
        real_commit = oxyde_tx._commit_transaction

        async def slow_commit(tx_id):
            await push_sender.asyncio.sleep(1.5)
            await real_commit(tx_id)

        monkeypatch.setattr(oxyde_tx, "_commit_transaction", slow_commit)
        async with atomic():
            await InboxService().notify_assignment(
                issue=test_issue, project=test_project, assignee_id=test_user.id, assigned_by=test_user2,
            )
        await push_sender.drain()
        assert len(push.requests) == 1

    async def test_a_plain_oxyde_transaction_is_refused(
        self, push, test_user, test_user2, test_issue, test_project,
    ):
        """Registering inside oxyde.atomic() cannot be honoured; it is
        logged (and fails the test through conftest's handler)."""
        import oxyde

        from . import conftest

        await _device(test_user, Phone())
        async with oxyde.atomic():
            await InboxService().notify_assignment(
                issue=test_issue, project=test_project, assignee_id=test_user.id, assigned_by=test_user2,
            )
        await push_sender.drain()
        assert push.requests == []
        assert any("Failed to schedule push notifications" in e for e in conftest.push_errors)
        conftest.push_errors.clear()


class TestResolved:
    async def _gate(self, test_project, test_issue, ritual, requester):
        await InboxService().notify_gate_pending(
            ritual=ritual, issue=test_issue, project=test_project,
            requested_by_name="Two", requested_by_id=requester.id,
        )
        await push_sender.drain()

    async def test_resolving_a_gate_withdraws_it(
        self, push, test_user, test_user2, test_team, test_issue, test_project, gate_close_ritual,
    ):
        phone = Phone()
        await _device(test_user, phone)
        await self._gate(test_project, test_issue, gate_close_ritual, test_user2)
        entry = await OxydeInboxEntry.objects.get(recipient_user_id=test_user.id)
        push.requests.clear()

        await InboxService().resolve_gate_or_review(ritual_id=gate_close_ritual.id, issue_id=test_issue.id)
        await push_sender.drain()
        [request] = push.requests
        assert phone.read(request) == {
            "v": 1, "type": "resolved", "id": entry.id, "collapse": f"issue:{test_issue.id}",
        }
        # Replaces the entry's own message if both still wait.
        assert request.headers["topic"] == push_sender.topic(entry.id)

        # Resolving again settles nothing new and sends nothing.
        push.requests.clear()
        await InboxService().resolve_gate_or_review(ritual_id=gate_close_ritual.id, issue_id=test_issue.id)
        await push_sender.drain()
        assert push.requests == []

    async def test_withdrawn_whatever_the_preference(
        self, push, test_user, test_user2, test_team, test_issue, test_project, gate_close_ritual,
    ):
        await _device(test_user, Phone())
        await self._gate(test_project, test_issue, gate_close_ritual, test_user2)
        await PushService().set_preferences(test_user.id, {InboxEntryKind.GATE_PENDING: False})
        push.requests.clear()
        await InboxService().resolve_for_ritual(gate_close_ritual.id)
        await push_sender.drain()
        assert len(push.requests) == 1

    async def test_deleting_the_issue_withdraws_its_entries(
        self, push, test_user, test_user2, test_issue, test_project,
    ):
        from app.services.issue_service import IssueService

        phone = Phone()
        await _device(test_user, phone)
        await _assign(test_issue, test_project, test_user, test_user2)
        push.requests.clear()
        await IssueService().delete(test_issue, actor_id=None)
        await push_sender.drain()
        assert phone.read(push.requests[0])["type"] == "resolved"

    async def test_deleting_a_document_withdraws_its_entries(
        self, push, test_user, test_user2, test_team, test_document,
    ):
        from app.services.document_service import DocumentService

        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        phone = Phone()
        await _device(test_user, phone)
        await InboxService().notify_mentions(
            # "@test" is also Test User 2's first word, so it reaches nobody
            # (CHT-1731); the whole-name handle is test_user's alone.
            content="hey @test-user", team_id=test_team.id,
            author=test_user2, document=test_document,
        )
        await push_sender.drain()
        assert phone.read(push.requests[0])["collapse"] == f"document:{test_document.id}"
        push.requests.clear()
        await DocumentService().delete(test_document, test_user.id)
        await push_sender.drain()
        assert phone.read(push.requests[0])["type"] == "resolved"

    async def test_an_entry_deleted_outright_is_still_withdrawn(self, push, test_user):
        phone = Phone()
        await _device(test_user, phone)
        await push_sender._deliver_resolved([("gone-id", test_user.id, "entry:gone-id")])
        assert phone.read(push.requests[0])["id"] == "gone-id"

    async def test_an_entry_deleted_before_delivery_is_skipped(self, push, test_user, caplog):
        await _device(test_user, Phone())
        with caplog.at_level("INFO", logger="app.services.push_sender"):
            await push_sender._deliver_created(["gone-id"])
        assert push.requests == []
        assert "no longer exists" in caplog.text


class TestAnswers:
    async def _send(self, push, test_user, test_user2, test_issue, test_project, *answers):
        push.answers = list(answers)
        device = await _device(test_user, Phone())
        await _assign(test_issue, test_project, test_user, test_user2)
        return device

    @pytest.mark.parametrize("status", [404, 410])
    async def test_gone_deletes_the_device(self, status, push, test_user, test_user2, test_issue, test_project):
        device = await self._send(push, test_user, test_user2, test_issue, test_project, status)
        assert len(push.requests) == 1
        assert await OxydePushDevice.objects.filter(id=device.id).count() == 0

    async def test_5xx_retries_then_succeeds(self, push, test_user, test_user2, test_issue, test_project):
        device = await self._send(push, test_user, test_user2, test_issue, test_project, 503, 201)
        assert len(push.requests) == 2
        assert (await OxydePushDevice.objects.get(id=device.id)).failure_count == 0

    async def test_429_retries_then_counts_a_failure(self, push, test_user, test_user2, test_issue, test_project):
        device = await self._send(push, test_user, test_user2, test_issue, test_project, (429, {"Retry-After": "0"}))
        assert len(push.requests) == 3
        assert (await OxydePushDevice.objects.get(id=device.id)).failure_count == 1

    async def test_network_errors_retry(self, push, test_user, test_user2, test_issue, test_project):
        device = await self._send(
            push, test_user, test_user2, test_issue, test_project, httpx.ConnectError("down"), 201,
        )
        assert len(push.requests) == 2
        assert (await OxydePushDevice.objects.get(id=device.id)).last_success_at is not None

    async def test_other_refusals_count_without_retry(self, push, test_user, test_user2, test_issue, test_project):
        device = await self._send(push, test_user, test_user2, test_issue, test_project, 403)
        assert len(push.requests) == 1
        assert (await OxydePushDevice.objects.get(id=device.id)).failure_count == 1

    async def test_a_long_retry_after_is_not_retried(self, push, test_user, test_user2, test_issue, test_project):
        device = await self._send(
            push, test_user, test_user2, test_issue, test_project, (429, {"Retry-After": "3600"}),
        )
        assert len(push.requests) == 1
        assert (await OxydePushDevice.objects.get(id=device.id)).failure_count == 1

    async def test_retry_waits_at_least_retry_after(self, push, test_user, test_user2, test_issue, test_project):
        started = push_sender.time.monotonic()
        await self._send(push, test_user, test_user2, test_issue, test_project, (503, {"Retry-After": "1"}), 201)
        assert len(push.requests) == 2
        assert push_sender.time.monotonic() - started >= 1.0

    def test_retry_after_forms(self):
        now = datetime(2026, 10, 14, 12, 0, 0, tzinfo=timezone.utc)

        def asked(value):
            return push_sender.retry_after(httpx.Response(429, headers={"Retry-After": value}), now=now)

        assert asked("120") == 120.0
        assert asked("Wed, 14 Oct 2026 12:00:45 GMT") == 45.0
        assert asked("Wed, 14 Oct 2026 11:00:00 GMT") == 0.0
        assert asked("soon") is None
        assert push_sender.retry_after(httpx.Response(503)) is None
        assert push_sender.retry_after(None) is None

    async def test_one_bad_device_does_not_stop_the_others(
        self, push, test_user, test_user2, test_issue, test_project,
    ):
        """PR #357 review, finding 7: an unusable stored key fails that
        device alone, and counts."""
        good = await _device(test_user, Phone())
        bad = await _device(
            test_user, Phone(), endpoint="https://ntfy.example.net/other", p256dh=_b64(b"\x04" + b"\x01" * 64),
        )
        await _assign(test_issue, test_project, test_user, test_user2)
        from . import conftest

        assert any("Push to device" in e for e in conftest.push_errors)
        conftest.push_errors.clear()
        assert len(push.requests) == 1
        assert (await OxydePushDevice.objects.get(id=good.id)).last_success_at is not None
        assert (await OxydePushDevice.objects.get(id=bad.id)).failure_count == 1

    async def test_next_address_on_connect_error(
        self, push, fake_dns, test_user, test_user2, test_issue, test_project,
    ):
        fake_dns["ntfy.example.net"] = ["2606:4700::6810:84e5", PUBLIC_IP]
        push.answers = [httpx.ConnectError("no route"), 201]
        await _device(test_user, Phone())
        await _assign(test_issue, test_project, test_user, test_user2)
        assert [r.url.host for r in push.requests] == ["2606:4700::6810:84e5", PUBLIC_IP]

    async def test_a_dead_address_gives_way_on_a_short_connect_timeout(
        self, push, fake_dns, test_user, test_user2, test_issue, test_project,
    ):
        """CHT-1632 R1: each address gets CONNECT_TIMEOUT_SECONDS to
        connect, well inside the request's overall limit, so one that
        black-holes traffic is abandoned for the next."""
        assert push_sender.CONNECT_TIMEOUT_SECONDS < push_sender.REQUEST_TIMEOUT_SECONDS / 2
        fake_dns["ntfy.example.net"] = ["2606:4700::6810:84e5", PUBLIC_IP]
        push.answers = [httpx.ConnectTimeout("black hole"), 201]
        await _device(test_user, Phone())
        await _assign(test_issue, test_project, test_user, test_user2)
        assert [r.url.host for r in push.requests] == ["2606:4700::6810:84e5", PUBLIC_IP]
        timeouts = push.requests[0].extensions["timeout"]
        assert timeouts["connect"] == push_sender.CONNECT_TIMEOUT_SECONDS
        assert timeouts["read"] == push_sender.REQUEST_TIMEOUT_SECONDS

    async def test_a_sent_message_never_counts_a_failure(self, push, test_user, monkeypatch):
        """CHT-1632 R4: the push service took it; failing to record that
        is logged, and failure_count stays as it was."""
        from . import conftest

        device = await _device(test_user, Phone())
        await OxydePushDevice.objects.filter(id=device.id).update(failure_count=2)
        push.answers = [201]

        def broken_clock():
            raise RuntimeError("cannot record")
        monkeypatch.setattr(push_sender, "_now", broken_clock)
        message = push_sender._Message(test_user.id, "entry-id", b"{}", "normal")
        assert await push_sender.send(device, message) == "sent"
        assert any("Could not record push outcome 'sent'" in e for e in conftest.push_errors)
        conftest.push_errors.clear()
        assert (await OxydePushDevice.objects.get(id=device.id)).failure_count == 2

    def test_ca_bundle_from_the_environment(self, monkeypatch):
        import ssl

        import certifi

        monkeypatch.delenv("SSL_CERT_FILE", raising=False)
        monkeypatch.delenv("SSL_CERT_DIR", raising=False)
        assert push_sender._verify() is True
        monkeypatch.setenv("SSL_CERT_FILE", certifi.where())
        assert isinstance(push_sender._verify(), ssl.SSLContext)


class TestLiveDevicesOnly:
    """A device row that outlived its credential gets nothing. Revoking a
    key or session deletes its devices, but since PR #356 that cleanup
    runs after commit and can fail, leaving the row until the startup
    sweep (CHT-1627). These tests keep the row and change only the
    credential, which is that window."""

    async def _nothing_sent(self, push, test_user, test_user2, test_issue, test_project):
        await _assign(test_issue, test_project, test_user, test_user2)
        assert push.requests == []

    async def test_expired_credential(self, push, test_user, test_user2, test_issue, test_project):
        await _device(test_user, Phone(), credential_expires_at=datetime.now(timezone.utc) - timedelta(seconds=1))
        await self._nothing_sent(push, test_user, test_user2, test_issue, test_project)

    async def test_old_vapid_key(self, push, test_user, test_user2, test_issue, test_project):
        await _device(test_user, Phone(), vapid_key_id="someotherkey")
        await self._nothing_sent(push, test_user, test_user2, test_issue, test_project)

    async def test_inactive_user(self, push, test_user, test_user2, test_issue, test_project):
        await _device(test_user, Phone())
        await OxydeUser.objects.filter(id=test_user.id).update(is_active=False)
        await self._nothing_sent(push, test_user, test_user2, test_issue, test_project)

    @pytest.mark.parametrize("change", [
        {"is_active": False},
        {"expires_at": datetime.now(timezone.utc) - timedelta(minutes=1)},
    ])
    async def test_inactive_or_expired_key(self, change, push, test_user, test_user2, test_issue, test_project):
        key, _ = await APIKeyService().create(test_user.id, APIKeyCreate(name="phone"))
        await _device(test_user, Phone(), credential_id=key.id)
        # Live first: one push gets through.
        await _assign(test_issue, test_project, test_user, test_user2)
        assert len(push.requests) == 1
        push.requests.clear()
        await OxydeAPIKey.objects.filter(id=key.id).update(**change)
        await self._nothing_sent(push, test_user, test_user2, test_issue, test_project)
        assert await OxydePushDevice.objects.filter(credential_id=key.id).count() == 1  # the window CHT-1627 names

    async def _session(self, test_team, principal, holder, **fields):
        """A holder session acting as ``principal``: a human one, as the
        app's own session will be (CHT-1602), built by hand."""
        from app.enums import HolderVia
        from app.oxyde_models.oauth import OxydeHolderSession

        later = datetime.now(timezone.utc) + timedelta(days=1)
        values = dict(
            team_id=test_team.id, principal_user_id=principal.id, holder_user_id=holder.id,
            via=HolderVia.GRANTEE_CREDENTIAL, resource="https://chaotic.example/mcp",
            idle_expires_at=later, absolute_expires_at=later,
        )
        values.update(fields)
        return await OxydeHolderSession.objects.create(**values)

    async def _live_then(self, push, session, change, test_user, test_user2, test_issue, test_project):
        from app.oxyde_models.oauth import OxydeHolderSession

        await _device(test_user, Phone(), holder_session_id=session.id)
        await _assign(test_issue, test_project, test_user, test_user2)
        assert len(push.requests) == 1
        push.requests.clear()
        await change()
        await self._nothing_sent(push, test_user, test_user2, test_issue, test_project)
        assert await OxydeHolderSession.objects.filter(id=session.id).count() == 1

    @pytest.mark.parametrize("field", ["revoked_at", "idle_expires_at", "absolute_expires_at"])
    async def test_revoked_or_expired_session(
        self, field, push, test_team, test_user, test_user2, test_issue, test_project,
    ):
        from app.oxyde_models.oauth import OxydeHolderSession

        session = await self._session(test_team, test_user, test_user)

        async def change():
            await OxydeHolderSession.objects.filter(id=session.id).update(
                **{field: datetime.now(timezone.utc) - timedelta(seconds=1)},
            )

        await self._live_then(push, session, change, test_user, test_user2, test_issue, test_project)

    async def test_session_claim_key_revoked(self, push, test_team, test_user, test_user2, test_issue, test_project):
        """The resolver refuses a session whose claiming key died; so does
        the sender (PR #357 review, finding 2)."""
        key, _ = await APIKeyService().create(test_user.id, APIKeyCreate(name="claim"))
        session = await self._session(test_team, test_user, test_user, credential_id=key.id)

        async def change():
            await OxydeAPIKey.objects.filter(id=key.id).update(is_active=False)

        await self._live_then(push, session, change, test_user, test_user2, test_issue, test_project)

    async def test_session_holder_left_the_team(
        self, push, test_team, test_user, test_user2, test_issue, test_project,
    ):
        session = await self._session(test_team, test_user, test_user)

        async def change():
            await OxydeTeamMember.objects.filter(team_id=test_team.id, user_id=test_user.id).delete()

        await self._live_then(push, session, change, test_user, test_user2, test_issue, test_project)

    async def test_session_holder_inactive(self, push, test_team, test_user, test_user2, test_issue, test_project):
        from app.oxyde_models.oauth import OxydeHolderSession

        holder = test_user2
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=holder.id, role=TeamRole.MEMBER)
        session = await self._session(test_team, test_user, holder)
        await _device(test_user, Phone(), holder_session_id=session.id)
        await OxydeUser.objects.filter(id=holder.id).update(is_active=False)
        await self._nothing_sent(push, test_user, test_user2, test_issue, test_project)
        assert await OxydeHolderSession.objects.filter(id=session.id).count() == 1

    async def test_a_session_acting_as_someone_else(
        self, push, monkeypatch, test_team, test_user, test_user2, test_issue, test_project,
    ):
        """A device belongs to the person who registered it; a device row
        bound to a session acting as someone else (an agent the person
        holds) gets nothing."""
        from .oauth_tokens import connector_token, enable_oauth, make_agent

        enable_oauth(monkeypatch)
        agent = await make_agent(test_team, test_user)
        issued = await connector_token(agent, test_team, test_user)
        await _device(test_user, Phone(), holder_session_id=issued.holder_session_id)
        await self._nothing_sent(push, test_user, test_user2, test_issue, test_project)

    async def test_someone_elses_key(self, push, test_user, test_user2, test_issue, test_project):
        key, _ = await APIKeyService().create(test_user2.id, APIKeyCreate(name="theirs"))
        await _device(test_user, Phone(), credential_id=key.id)
        await self._nothing_sent(push, test_user, test_user2, test_issue, test_project)


class TestEndpointPolicyAtSendTime:
    async def test_private_endpoint_after_the_setting_is_off(
        self, push, test_user, test_user2, test_issue, test_project,
    ):
        device = await _device(test_user, Phone(), endpoint="https://intranet.example.net/up")
        await _assign(test_issue, test_project, test_user, test_user2)
        assert push.requests == []
        assert (await OxydePushDevice.objects.get(id=device.id)).failure_count == 1

    async def test_private_endpoint_while_allowed(
        self, push, monkeypatch, test_user, test_user2, test_issue, test_project,
    ):
        monkeypatch.setenv("PUSH_ALLOW_PRIVATE_ENDPOINTS", "true")
        get_settings.cache_clear()
        try:
            await _device(test_user, Phone(), endpoint="https://intranet.example.net:8443/up")
            await _assign(test_issue, test_project, test_user, test_user2)
        finally:
            get_settings.cache_clear()
        [request] = push.requests
        assert (request.url.host, request.url.port) == ("10.0.0.5", 8443)
        assert request.headers["host"] == "intranet.example.net:8443"
        token = request.headers["authorization"].split("t=")[1].split(",")[0]
        assert json.loads(_unb64(token.split(".")[1]))["aud"] == "https://intranet.example.net:8443"

    async def test_dns_rebinding(self, push, fake_dns, test_user, test_user2, test_issue, test_project):
        await _device(test_user, Phone())
        fake_dns["ntfy.example.net"] = [PUBLIC_IP, "127.0.0.1"]
        await _assign(test_issue, test_project, test_user, test_user2)
        assert push.requests == []

    async def test_ip_literal_endpoint(self, push, test_user, test_user2, test_issue, test_project):
        await _device(test_user, Phone(), endpoint=f"https://{PUBLIC_IP}/up")
        await _assign(test_issue, test_project, test_user, test_user2)
        assert push.requests[0].url.host == PUBLIC_IP


class TestFailSoft:
    async def test_scheduling_never_raises(self, monkeypatch, caplog):
        async def boom(user_ids):
            raise RuntimeError("db down")

        monkeypatch.setattr(push_sender, "_any_devices", boom)
        await push_sender.push_created([OxydeInboxEntry(
            recipient_user_id="u", kind=InboxEntryKind.MENTION, team_id="t", title="x",
        )])
        await push_sender.push_resolved([OxydeInboxEntry(
            recipient_user_id="u", kind=InboxEntryKind.MENTION, team_id="t", title="x",
        )])
        assert "Failed to schedule push notifications" in caplog.text
        assert "Failed to schedule push withdrawals" in caplog.text

    async def test_delivery_errors_are_logged(self, db, monkeypatch):
        from . import conftest

        async def boom(*args, **kwargs):
            raise RuntimeError("db down")

        monkeypatch.setattr(push_sender, "_send_all", boom)
        await push_sender._deliver_created([])
        await push_sender._deliver_resolved([("x", "u", "c")])
        errors = list(conftest.push_errors)
        conftest.push_errors.clear()
        assert any("Push delivery failed" in e for e in errors)
        assert any("Push withdrawal failed" in e for e in errors)


class TestShutdownDrain:
    """CHT-1628 (PR #358 review, finding 4): shutdown waits a bounded
    time for deliveries in flight, then closes the database."""

    @pytest.fixture
    def lifespan(self, db, monkeypatch):
        import contextlib

        import app.main as main

        events: list[str] = []

        async def noop(*args, **kwargs):
            return None

        async def close():
            events.append("closed")

        @contextlib.asynccontextmanager
        async def no_mcp():
            yield

        for name in ("init_oxyde", "bootstrap_if_empty", "verify_migrations_current", "_mcp_toolset_fingerprint"):
            monkeypatch.setattr(main, name, noop)
        monkeypatch.setattr(main, "close_oxyde", close)
        monkeypatch.setattr(main, "get_version_info", lambda *a, **k: None)
        monkeypatch.setattr(main, "mcp_lifespan", no_mcp)
        monkeypatch.setattr(main.settings, "secret_key", "x" * 32)
        monkeypatch.setattr(push_service.PushService, "delete_stale_bindings", noop)
        return main, events

    async def test_waits_for_a_delivery_before_closing(self, lifespan):
        main, events = lifespan

        async def delivery():
            await asyncio.sleep(0.05)
            events.append("delivered")

        async with main.lifespan(main.app):
            push_sender._spawn(delivery())
        assert events == ["delivered", "closed"]

    async def test_gives_up_after_the_timeout(self, lifespan, monkeypatch, caplog):
        main, events = lifespan
        monkeypatch.setattr(push_sender, "SHUTDOWN_DRAIN_SECONDS", 0.05)
        stuck = asyncio.Event()

        with caplog.at_level("WARNING", logger="app.services.push_sender"):
            async with main.lifespan(main.app):
                push_sender._spawn(stuck.wait())
        assert events == ["closed"]
        assert "still in flight" in caplog.text
        assert all(t.done() for t in push_sender._tasks)

    async def test_waits_for_a_detached_dispatch_and_what_it_schedules(self, db):
        """A dispatch whose request was cancelled can still schedule a
        delivery; drain() waits for both."""
        from app.db.transactions import atomic, on_commit

        started, release = asyncio.Event(), asyncio.Event()
        delivered = []

        async def deliver():
            delivered.append(True)

        async def callback():
            started.set()
            await release.wait()
            push_sender._spawn(deliver())

        async def request():
            async with atomic():
                await on_commit(callback)

        task = asyncio.create_task(request())
        await started.wait()
        task.cancel()
        with pytest.raises(asyncio.CancelledError):
            await task
        asyncio.get_running_loop().call_later(0.02, release.set)
        assert await push_sender.drain(timeout=5) is True
        assert delivered == [True]
