"""Email verification by mailed code (CHT-1790).

Signup takes any address on trust, so before this an invitation token
was enough to join a team as anyone: sign up as the invited address,
accept. A person now proves they receive mail at their account's
address by entering a six-digit code the server mailed there, and with
SMTP configured, accepting an invitation requires that proof
(``app.api.teams.accept_invitation``).

Rules:

* A code lives ``CODE_TTL`` (15 minutes) and allows ``MAX_ATTEMPTS``
  (5) confirmations; after that it is dead and a new one is needed.
* Only a user's newest code can be confirmed, so sending one retires
  every older one.
* At most one code per ``RESEND_INTERVAL`` (60 s) and ``HOURLY_LIMIT``
  (5) per hour per user. The rows are the send history the limits
  count; rows older than the hour are pruned on the next request, and
  all of a user's rows go once the address is verified.
* Only an HMAC-SHA256 of the code is stored, keyed with the server's
  SECRET_KEY and bound to the user id, and it is compared with
  ``hmac.compare_digest``. A copy of the database alone does not give
  the codes back.

Unlike the app's other email, the send is awaited: the person is
waiting for this code, so a failed send is reported to them, not only
logged. ``EmailService.send`` never raises; its False is the failure.

Nothing changes an account's address today (``UserUpdate`` has no
``email``). Whatever ever does must set ``email_verified_at`` back to
NULL and delete the user's codes in the same write, or a verification
of the old address would vouch for the new one.
"""
from __future__ import annotations

import hashlib
import hmac
import secrets
from datetime import datetime, timedelta, timezone

from oxyde import F

from app.config import get_settings
from app.oxyde_models.email_verification import OxydeEmailVerificationCode
from app.oxyde_models.user import OxydeUser
from app.services.email_service import EmailService
from app.utils.datetimes import ensure_utc

CODE_TTL = timedelta(minutes=15)
MAX_ATTEMPTS = 5
RESEND_INTERVAL = timedelta(seconds=60)
HOURLY_WINDOW = timedelta(hours=1)
HOURLY_LIMIT = 5
CODE_DIGITS = 6


class VerificationRefused(Exception):
    """A request or confirmation this server refuses: an HTTP status, a
    stable ``error_code`` and a sentence, with any headers (Retry-After)."""

    def __init__(self, status_code: int, error_code: str, message: str, headers: dict | None = None):
        super().__init__(message)
        self.status_code = status_code
        self.error_code = error_code
        self.message = message
        self.headers = headers

    def detail(self) -> dict:
        return {"error_code": self.error_code, "message": self.message}


UNAVAILABLE = VerificationRefused(
    409, "email_verification_unavailable",
    "Email verification is unavailable: this server has no SMTP configured, so it cannot send a code.",
)
INVALID_CODE_MESSAGE = (
    "That code is wrong, has expired or has been used up. "
    "Check the latest email, or request a new code."
)


def _now() -> datetime:
    return datetime.now(timezone.utc)


def hash_code(user_id: str, code: str) -> str:
    """HMAC-SHA256 of ``code`` for ``user_id`` under the server's key."""
    key = get_settings().secret_key.encode()
    return hmac.new(key, f"{user_id}:{code}".encode(), hashlib.sha256).hexdigest()


def new_code() -> str:
    return f"{secrets.randbelow(10 ** CODE_DIGITS):0{CODE_DIGITS}d}"


def render_code_email(code: str) -> tuple[str, str]:
    """(subject, body) of the verification email."""
    minutes = int(CODE_TTL.total_seconds() // 60)
    subject = "[Chaotic] Your email verification code"
    body = (
        f"Your Chaotic verification code is: {code}\n"
        "\n"
        f"It expires in {minutes} minutes. Enter it in Chaotic to confirm this address\n"
        "(`chaotic auth verify-email`).\n"
        "\n"
        "If you did not ask for this, ignore this email.\n"
        "\n"
        "— Chaotic"
    )
    return subject, body


def _seconds_until(moment: datetime, now: datetime) -> int:
    return max(1, int((moment - now).total_seconds() + 0.999))


class EmailVerificationService:
    """Sends and confirms verification codes."""

    def __init__(self, email_service: EmailService | None = None):
        self.email = email_service or EmailService()

    async def request_code(self, user: OxydeUser) -> OxydeEmailVerificationCode:
        """Mail a new code to ``user.email`` and return its row.

        Raises VerificationRefused: 409 when already verified or SMTP is
        unconfigured, 429 (with Retry-After) over a rate limit, 502 when
        the send failed.
        """
        if user.email_verified_at is not None:
            raise VerificationRefused(409, "email_already_verified", "Your email address is already verified.")
        if not self.email.is_configured():
            raise UNAVAILABLE

        now = _now()
        codes = OxydeEmailVerificationCode.objects
        await codes.filter(user_id=user.id, created_at__lt=now - HOURLY_WINDOW).delete()

        # Insert first, then count: two requests racing each other then
        # both see the other's row, and at worst both are refused, never
        # both let through.
        code = new_code()
        row = await codes.create(
            user_id=user.id,
            code_hash=hash_code(user.id, code),
            expires_at=now + CODE_TTL,
            attempts=0,
            created_at=now,
        )
        recent = await codes.filter(user_id=user.id, created_at__gte=now - HOURLY_WINDOW).order_by("created_at").all()
        others = [r for r in recent if r.id != row.id]
        refusal = None
        if others and ensure_utc(others[-1].created_at) > now - RESEND_INTERVAL:
            retry = _seconds_until(ensure_utc(others[-1].created_at) + RESEND_INTERVAL, now)
            refusal = VerificationRefused(
                429, "email_verification_rate_limited",
                f"A code was sent less than a minute ago. Wait {retry} s before asking for another.",
                headers={"Retry-After": str(retry)},
            )
        elif len(others) >= HOURLY_LIMIT:
            retry = _seconds_until(ensure_utc(others[-HOURLY_LIMIT].created_at) + HOURLY_WINDOW, now)
            refusal = VerificationRefused(
                429, "email_verification_rate_limited",
                f"Too many codes requested in the last hour ({HOURLY_LIMIT} at most). "
                f"Try again in {(retry + 59) // 60} min.",
                headers={"Retry-After": str(retry)},
            )
        if refusal is not None:
            await codes.filter(id=row.id).delete()
            raise refusal

        subject, body = render_code_email(code)
        if not await self.email.send(user.email, subject, body):
            # Never delivered: kill it, but keep it as history so a
            # failing relay is not hammered faster than the limits allow.
            await codes.filter(id=row.id).update(attempts=MAX_ATTEMPTS)
            raise VerificationRefused(
                502, "email_send_failed",
                "The verification email could not be sent: the server's mail relay failed. "
                "Try again later, or ask the server's operator to check its SMTP settings.",
            )
        return row

    async def confirm(self, user: OxydeUser, code: str) -> OxydeUser:
        """Check ``code`` against the user's newest code; on a match mark
        the address verified and drop every code. A wrong, expired, dead
        or superseded code all get the same 400 ``invalid_verification_code``.
        """
        if user.email_verified_at is not None:
            raise VerificationRefused(409, "email_already_verified", "Your email address is already verified.")
        invalid = VerificationRefused(400, "invalid_verification_code", INVALID_CODE_MESSAGE)
        now = _now()
        codes = OxydeEmailVerificationCode.objects
        latest = await codes.filter(user_id=user.id).order_by("-created_at").first()
        if latest is None or ensure_utc(latest.expires_at) <= now:
            raise invalid
        # Spend an attempt before comparing, conditionally, so concurrent
        # guesses cannot get past the cap between a read and a write.
        spent = await codes.filter(id=latest.id, attempts__lt=MAX_ATTEMPTS).update(
            attempts=F("attempts") + 1,
        )
        if not spent:
            raise invalid
        if not hmac.compare_digest(latest.code_hash, hash_code(user.id, code.strip())):
            raise invalid

        user.email_verified_at = now
        await user.save(update_fields={"email_verified_at"})
        await codes.filter(user_id=user.id).delete()
        await user.refresh()
        return user
