"""Web Push vectors shared with the Android app (CHT-1612).

``android/testdata/web-push-vectors.json`` holds push message bodies
made by ``push_sender.encrypt`` from the payloads ``entry_payload`` and
``resolved_payload`` build, with fixed keys and salts so the bytes are
reproducible. The app's unit tests read the same file: core-sync parses
each plaintext, and :app decrypts each body with the UnifiedPush
connector's decryption, the code that runs on the phone. This test is
what ties the file to the server: it rebuilds every vector and fails if
the file differs, so a change to the payload or the encryption cannot
pass here while the app is still tested against the old bytes.

After a deliberate change, rewrite the file and commit it:

    REGENERATE_PUSH_VECTORS=1 uv run pytest tests/test_push_vectors.py -n 0
"""
import base64
import hashlib
import json
import os
from pathlib import Path
from types import SimpleNamespace

from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import ec

from app.services import push_sender

VECTORS = Path(__file__).resolve().parents[2] / "android" / "testdata" / "web-push-vectors.json"


def _b64(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode()


def _unb64(value: str) -> bytes:
    return base64.urlsafe_b64decode(value + "=" * (-len(value) % 4))


_P256_ORDER = 0xFFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551


def _key(label: str) -> ec.EllipticCurvePrivateKey:
    """A fixed P-256 key derived from ``label``, so the file is reproducible."""
    scalar = int.from_bytes(hashlib.sha256(f"chaotic-push-vector:{label}".encode()).digest(), "big")
    return ec.derive_private_key(scalar % (_P256_ORDER - 1) + 1, ec.SECP256R1())


def _bytes(label: str, n: int) -> bytes:
    return hashlib.sha256(f"chaotic-push-vector:{label}".encode()).digest()[:n]


def _point(key: ec.EllipticCurvePrivateKey) -> bytes:
    return key.public_key().public_bytes(serialization.Encoding.X962, serialization.PublicFormat.UncompressedPoint)


def _entry(**fields) -> SimpleNamespace:
    base = dict(
        id="0b6f8f5e-3f1c-4a5e-9a59-1f3c1e2b4d01", kind="gate_pending", title="", issue_id=None,
        document_id=None, ritual_id=None,
    )
    base.update(fields)
    return SimpleNamespace(**base)


# RFC 8291 Appendix A: its own keys, salt and message (not a Chaotic payload).
_RFC = dict(
    ua_private="q1dXpw3UpT5VOmu_cf_v6ih07Aems3njxI-JWgLcM94",
    auth="BTBZMqHH6r4Tts7J_aSIgg",
    sender_private="yfWPiYE-n46HLnH0KqZOF1fJJU3MYrct3AELtAQ-oRw",
    salt="DGv6ra1nlYgDCS1FRnbzlw",
)


def _plaintexts() -> list[tuple[str, bytes, bool]]:
    """(name, plaintext, whether it is a Chaotic payload)."""
    return [
        ("rfc8291-appendix-a", b"When I grow up, I want to be a watermelon", False),
        ("entry-gate-on-issue", push_sender.entry_payload(_entry(
            kind="gate_pending", title="Approve the deploy gate", issue_id="a1d4c7e0-1111-4c2b-8d33-000000000012",
            ritual_id="5c0ffee0-2222-4b5b-9c44-000000000001",
        ), "CHT-12"), True),
        ("entry-mention-on-document", push_sender.entry_payload(_entry(
            id="0b6f8f5e-3f1c-4a5e-9a59-1f3c1e2b4d02", kind="mention", title="Café ✓ — 日本語 mention",
            document_id="d0c00000-3333-4d6d-8e55-000000000007",
        ), None), True),
        ("entry-long-title", push_sender.entry_payload(_entry(
            id="0b6f8f5e-3f1c-4a5e-9a59-1f3c1e2b4d03", kind="assignment", title="t" * 250,
            issue_id="a1d4c7e0-1111-4c2b-8d33-000000000013",
        ), "CHT-13"), True),
        ("entry-device-added", push_sender.entry_payload(_entry(
            id="0b6f8f5e-3f1c-4a5e-9a59-1f3c1e2b4d04", kind="push_device_added",
            title="A new device will get your notifications",
        ), None), True),
        ("resolved-on-issue", push_sender.resolved_payload(
            "0b6f8f5e-3f1c-4a5e-9a59-1f3c1e2b4d01", "issue:a1d4c7e0-1111-4c2b-8d33-000000000012",
        ), True),
        # The largest plaintext a body may carry (RFC 8291 section 4).
        ("largest-body", b"x" * 3993, False),
    ]


def build() -> dict:
    vectors = []
    for name, plaintext, payload in _plaintexts():
        if name == "rfc8291-appendix-a":
            ua = ec.derive_private_key(int.from_bytes(_unb64(_RFC["ua_private"]), "big"), ec.SECP256R1())
            auth = _unb64(_RFC["auth"])
            sender = ec.derive_private_key(int.from_bytes(_unb64(_RFC["sender_private"]), "big"), ec.SECP256R1())
            salt = _unb64(_RFC["salt"])
        else:
            ua, auth = _key(f"{name}:ua"), _bytes(f"{name}:auth", 16)
            sender, salt = _key(f"{name}:sender"), _bytes(f"{name}:salt", 16)
        body = push_sender.encrypt(plaintext, _point(ua), auth, sender_key=sender, salt=salt)
        vectors.append({
            "name": name,
            "ua_private": _b64(ua.private_numbers().private_value.to_bytes(32, "big")),
            "ua_public": _b64(_point(ua)),
            "auth": _b64(auth),
            "body": _b64(body),
            "plaintext": _b64(plaintext),
            "payload": payload,
        })
    return {
        "about": "Made by backend/tests/test_push_vectors.py from push_sender.encrypt; do not edit by hand.",
        "vectors": vectors,
    }


def _render(data: dict) -> str:
    return json.dumps(data, indent=2, ensure_ascii=False) + "\n"


def test_vectors_file_matches_the_server():
    expected = _render(build())
    if os.environ.get("REGENERATE_PUSH_VECTORS"):
        VECTORS.write_text(expected, encoding="utf-8")
    assert VECTORS.read_text(encoding="utf-8") == expected, (
        "android/testdata/web-push-vectors.json is out of date with push_sender; regenerate it "
        "(see this module's docstring) and check the Android tests still pass"
    )


def test_rfc_vector_is_the_rfcs():
    """The first vector is RFC 8291 Appendix A's body, byte for byte."""
    rfc = build()["vectors"][0]
    assert rfc["name"] == "rfc8291-appendix-a"
    assert rfc["body"] == (
        "DGv6ra1nlYgDCS1FRnbzlwAAEABBBP4z9KsN6nGRTbVYI_c7VJSPQTBtkgcy27mlmlMoZIIgDll6e3vCYLocInmYWAmS6Tlz"
        "AC8wEqKK6PBru3jl7A_yl95bQpu6cVPTpK4Mqgkf1CXztLVBSt2Ks3oZwbuwXPXLWyouBWLVWGNWQexSgSxsj_Qulcy4a-fN"
    )


def test_bodies_round_trip():
    """Every body opens with its vector's keys (the sender tests' own receiver)."""
    from tests.test_push_sender import receive

    for vector in build()["vectors"]:
        ua = ec.derive_private_key(int.from_bytes(_unb64(vector["ua_private"]), "big"), ec.SECP256R1())
        assert receive(_unb64(vector["body"]), ua, _unb64(vector["auth"])) == _unb64(vector["plaintext"])
