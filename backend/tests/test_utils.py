"""Tests for utility functions."""
from datetime import timedelta
from app.utils.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    decode_token,
)


def test_password_hashing():
    """Test password hashing and verification."""
    password = "securepassword123"
    hashed = get_password_hash(password)

    # Hash should be different from original
    assert hashed != password

    # Should verify correctly
    assert verify_password(password, hashed) is True

    # Wrong password should not verify
    assert verify_password("wrongpassword", hashed) is False


def test_password_hash_uniqueness():
    """Test that same password produces different hashes."""
    password = "samepassword"
    hash1 = get_password_hash(password)
    hash2 = get_password_hash(password)

    # Hashes should be different (bcrypt uses salt)
    assert hash1 != hash2

    # Both should verify
    assert verify_password(password, hash1) is True
    assert verify_password(password, hash2) is True


def test_create_access_token():
    """Test JWT token creation."""
    token = create_access_token(data={"sub": "user123"})

    assert token is not None
    assert isinstance(token, str)
    assert len(token) > 0


def test_create_access_token_with_expiry():
    """Test JWT token creation with custom expiry."""
    token = create_access_token(
        data={"sub": "user123"},
        expires_delta=timedelta(hours=1),
    )

    assert token is not None
    payload = decode_token(token)
    assert payload is not None
    assert payload["sub"] == "user123"


def test_decode_token():
    """Test JWT token decoding."""
    data = {"sub": "user456", "custom": "value"}
    token = create_access_token(data=data)

    payload = decode_token(token)
    assert payload is not None
    assert payload["sub"] == "user456"
    assert payload["custom"] == "value"
    assert "exp" in payload


def test_decode_invalid_token():
    """Test decoding invalid token returns None."""
    result = decode_token("invalid.token.here")
    assert result is None


def test_decode_malformed_token():
    """Test decoding malformed token."""
    result = decode_token("notavalidtoken")
    assert result is None


def test_decode_empty_token():
    """Test decoding empty token."""
    result = decode_token("")
    assert result is None


def test_bcrypt_cost_is_the_configured_one_and_defaults_to_production():
    """The suite runs at BCRYPT_ROUNDS=4 (conftest) so fixture users are
    cheap; the setting's default is the production cost, and a hash made
    at either cost verifies (CHT-1413)."""
    from app.config import Settings, get_settings
    from app.utils.security import get_password_hash, verify_password

    import os

    assert Settings.model_fields["bcrypt_rounds"].default == 12
    rounds = get_settings().bcrypt_rounds
    assert rounds == int(os.environ["BCRYPT_ROUNDS"])  # conftest's value (or an explicit one) reached the setting
    hashed = get_password_hash("pw")
    assert hashed.startswith(f"$2b${rounds:02d}$")
    assert verify_password("pw", hashed) and not verify_password("no", hashed)
    # A production-cost hash still verifies under the test cost.
    import bcrypt
    prod = bcrypt.hashpw(b"pw", bcrypt.gensalt(rounds=12)).decode()
    assert verify_password("pw", prod)
