"""The server's VAPID key (RFC 8292), for Web Push (CHT-1604).

A push service may tie a subscription to the application server's public
key; the app passes that key to the UnifiedPush distributor when it
subscribes, and the sender (CHT-1605) signs each request with the private
half. VAPID identifies the server to the push service. It protects no
payload: notifications are encrypted to each device's own keys (RFC 8291).

The key is ``VAPID_PRIVATE_KEY`` when set (PEM, or the raw 32-byte P-256
scalar in base64url, the form most Web Push tools print). Otherwise it is
derived from ``SECRET_KEY`` with HKDF-SHA256 under a label of its own, so
a server can push with no setup, and the same key comes back after every
restart and in every worker. Production refuses to start with the default
SECRET_KEY (app.main), so a derived key is never a published one there.
Rotating SECRET_KEY rotates a derived VAPID key; the app then fetches the
new public key and registers again.
"""
from __future__ import annotations

import base64
from functools import lru_cache

from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives.kdf.hkdf import HKDF

from app.config import get_settings

# The order of the P-256 group.
_P256_ORDER = 0xFFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551
_HKDF_INFO = b"chaotic.sh push vapid p256 v1"


class VapidKeyError(ValueError):
    """VAPID_PRIVATE_KEY is set but is not a P-256 private key."""


def _b64url_decode(value: str) -> bytes:
    return base64.urlsafe_b64decode(value + "=" * (-len(value) % 4))


def b64url(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode("ascii")


def _from_setting(value: str) -> ec.EllipticCurvePrivateKey:
    value = value.strip()
    if value.startswith("-----BEGIN"):
        try:
            key = serialization.load_pem_private_key(value.encode(), password=None)
        except (ValueError, TypeError) as exc:
            raise VapidKeyError("VAPID_PRIVATE_KEY is not a readable PEM private key") from exc
        if not isinstance(key, ec.EllipticCurvePrivateKey) or not isinstance(key.curve, ec.SECP256R1):
            raise VapidKeyError("VAPID_PRIVATE_KEY must be a P-256 (prime256v1) key")
        return key
    try:
        raw = _b64url_decode(value)
    except (ValueError, TypeError) as exc:
        raise VapidKeyError("VAPID_PRIVATE_KEY is neither PEM nor base64url") from exc
    if len(raw) != 32:
        raise VapidKeyError("VAPID_PRIVATE_KEY in base64url must decode to 32 bytes")
    scalar = int.from_bytes(raw, "big")
    if not 0 < scalar < _P256_ORDER:
        raise VapidKeyError("VAPID_PRIVATE_KEY is out of range for P-256")
    return ec.derive_private_key(scalar, ec.SECP256R1())


def _derived(secret_key: str) -> ec.EllipticCurvePrivateKey:
    # 48 bytes reduced mod (n - 1), plus 1: uniform enough on [1, n - 1]
    # (FIPS 186-5 A.2.1), and never zero.
    okm = HKDF(algorithm=hashes.SHA256(), length=48, salt=None, info=_HKDF_INFO).derive(secret_key.encode())
    scalar = int.from_bytes(okm, "big") % (_P256_ORDER - 1) + 1
    return ec.derive_private_key(scalar, ec.SECP256R1())


@lru_cache(maxsize=4)
def _key_for(setting: str, secret_key: str) -> ec.EllipticCurvePrivateKey:
    return _from_setting(setting) if setting.strip() else _derived(secret_key)


def private_key() -> ec.EllipticCurvePrivateKey:
    """The server's VAPID signing key, under the current settings."""
    settings = get_settings()
    return _key_for(settings.vapid_private_key, settings.secret_key)


def public_key_b64url() -> str:
    """The public key as Web Push's ``applicationServerKey``: the
    uncompressed P-256 point (65 bytes), base64url without padding."""
    point = private_key().public_key().public_bytes(
        serialization.Encoding.X962, serialization.PublicFormat.UncompressedPoint,
    )
    return b64url(point)
