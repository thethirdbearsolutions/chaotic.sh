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
from oxyde import atomic

from app.config import get_settings
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

    def test_a_message_must_fit_one_record(self):
        phone = Phone()
        with pytest.raises(ValueError):
            push_sender.encrypt(b"x" * 4096, phone.p256dh, phone.auth)


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

    def test_subject_is_the_https_base_url(self, monkeypatch):
        push_sender._vapid_tokens.clear()
        monkeypatch.setenv("APP_BASE_URL", "https://chaotic.example.org/")
        get_settings.cache_clear()
        try:
            token = push_sender.vapid_authorization("https://a.example", now=5).split("t=")[1].split(",")[0]
            assert json.loads(_unb64(token.split(".")[1]))["sub"] == "https://chaotic.example.org"
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
            await push_sender.asyncio.sleep(0.1)
            assert push.requests == []
        await push_sender.drain()
        assert len(push.requests) == 1

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

    async def test_writer_transaction_that_never_ends(self, monkeypatch):
        monkeypatch.setattr(push_sender, "COMMIT_WAIT_SECONDS", 0.05)

        class Open:
            id = 7

        assert await push_sender._wait_for_commit(Open()) is False
        assert await push_sender._wait_for_commit(None) is True

    async def test_timeout_skips_delivery(self, push, monkeypatch, caplog):
        async def never(tx):
            return False

        monkeypatch.setattr(push_sender, "_wait_for_commit", never)
        await push_sender._deliver_created(["x"], None)
        await push_sender._deliver_resolved([("x", "u", "entry:x")], None)
        assert push.requests == []
        assert caplog.text.count("did not end") == 2


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
        await IssueService().delete(test_issue)
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
            content="hey @" + (test_user.name.split(" ")[0].lower()), team_id=test_team.id,
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
        await push_sender._deliver_resolved([("gone-id", test_user.id, "entry:gone-id")], None)
        assert phone.read(push.requests[0])["id"] == "gone-id"


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

    def test_retry_after_is_capped(self):
        long = httpx.Response(429, headers={"Retry-After": "3600"})
        assert push_sender._retry_after(long, 1.0) == push_sender.MAX_RETRY_AFTER_SECONDS
        assert push_sender._retry_after(httpx.Response(503), 2.5) == 2.5
        assert push_sender._retry_after(None, 2.5) == 2.5


class TestLiveDevicesOnly:
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
        await OxydeAPIKey.objects.filter(id=key.id).update(**change)
        await self._nothing_sent(push, test_user, test_user2, test_issue, test_project)

    @pytest.mark.parametrize("field", ["revoked_at", "idle_expires_at", "absolute_expires_at"])
    async def test_revoked_or_expired_session(
        self, field, monkeypatch, push, test_team, test_user, test_user2, test_issue, test_project,
    ):
        from app.oxyde_models.oauth import OxydeHolderSession

        from .oauth_tokens import connector_token, enable_oauth, make_agent

        enable_oauth(monkeypatch)
        agent = await make_agent(test_team, test_user)
        issued = await connector_token(agent, test_team, test_user)
        await _device(test_user, Phone(), holder_session_id=issued.holder_session_id)
        # Live first: one push gets through.
        await _assign(test_issue, test_project, test_user, test_user2)
        assert len(push.requests) == 1
        push.requests.clear()
        await OxydeHolderSession.objects.filter(id=issued.holder_session_id).update(
            **{field: datetime.now(timezone.utc) - timedelta(seconds=1)},
        )
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

    async def test_delivery_errors_are_logged(self, monkeypatch, caplog):
        async def boom(*args, **kwargs):
            raise RuntimeError("db down")

        monkeypatch.setattr(push_sender, "_read_back", boom)
        await push_sender._deliver_created(["x"], None)
        await push_sender._deliver_resolved([("x", "u", "c")], None)
        assert "Push delivery failed" in caplog.text
        assert "Push withdrawal failed" in caplog.text
