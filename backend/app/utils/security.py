"""Security utilities for authentication."""
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
import bcrypt
from app.config import get_settings

settings = get_settings()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash."""
    return bcrypt.checkpw(
        plain_password.encode("utf-8"), hashed_password.encode("utf-8")
    )


def get_password_hash(password: str) -> str:
    """Hash a password."""
    # Read fresh, not from the module-level `settings` captured at import:
    # that copy can predate the test environment's BCRYPT_ROUNDS.
    rounds = get_settings().bcrypt_rounds
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt(rounds=rounds)).decode("utf-8")


# A claim on session JWTs minted for the web app's own login (CHT-1519
# review S1). The CLI's `chaotic auth login` and quickstart call the same
# /auth/login but never ask for it, so the JWT they keep on disk, which
# an agent in the human's shell can read, can't approve OAuth consent.
WEB_LOGIN_CLAIM = "ctx"
WEB_LOGIN = "web"


def is_web_login(token: str) -> bool:
    """Is ``token`` a valid session JWT from the web app's login?"""
    payload = decode_token(token)
    return bool(payload) and payload.get(WEB_LOGIN_CLAIM) == WEB_LOGIN


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """Create a JWT access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=settings.access_token_expire_minutes
        )
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, settings.secret_key, algorithm=settings.algorithm
    )
    return encoded_jwt


def decode_token(token: str) -> dict | None:
    """Decode a JWT token."""
    try:
        payload = jwt.decode(
            token, settings.secret_key, algorithms=[settings.algorithm]
        )
        return payload
    except JWTError:
        return None
