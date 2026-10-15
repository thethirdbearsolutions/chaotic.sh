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
* Only a user's newest sent code can be confirmed, so sending one
  retires every older one. A code whose request was refused or whose
  send failed is never confirmable (its row is not ``armed``).
* Limits are per **address** (an HMAC of the normalised address), not
  per account, so deleting the account and signing up again with the
  same address resets nothing: at most one code per ``RESEND_INTERVAL``
  (60 s) and ``HOURLY_LIMIT`` (5) per hour, and at most
  ``DAILY_FAILURE_LIMIT`` (15) failed confirmations in a rolling
  ``FAILURE_WINDOW`` (24 h). Past that cap every confirmation, the right
  code included, gets the same 400 as a wrong one, so it is not an
  oracle, and no new code is mailed (429 until enough failures leave
  the window). The rows are that history; they are pruned once older
  than ``FAILURE_WINDOW``. The address-wide cap is check-then-spend:
  confirmations racing each other all read the count before any of
  them spends, so together they can overshoot it by up to
  ``MAX_ATTEMPTS - 1`` (they share one code, whose own cap is atomic).
  That is acceptable: it bounds a burst, not a sustained guess rate.
* Only HMAC-SHA256s are stored: of the code (bound to the user id) and
  of the address, under a key derived from the server's SECRET_KEY for
  this purpose alone. Codes are compared with ``hmac.compare_digest``.
  A copy of the database alone does not give the codes back.

* A team admin can instead get a code for one pending invitation
  (CHT-1828, ``issue_for_invitation``) when the mail is failing. It is
  marked with its ``invitation_id``, which every address-keyed query
  here excludes (``invitation_id__isnull=True``), and only lets its user
  accept that invitation (``redeem_for_invitation``): it never sets
  ``email_verified_at``, since anyone can be the admin of a team of
  their own.

Unlike the app's other email, the send is awaited: the person is
waiting for this code, so a failed send is reported to them, not only
logged. ``EmailService.send`` never raises; its False is the failure.

Only ``UserService.change_email`` changes an account's address
(CHT-1827). It sets ``email_verified_at`` back to NULL in the same
write, or a verification of the old address would vouch for the new
one, and expires every code still live for the account (mailed codes
are bound to the old address's hash and would stop matching anyway).
"""
from __future__ import annotations

import hashlib
import hmac
import logging
import math
import secrets
from urllib.parse import urlsplit
from datetime import datetime, timedelta, timezone

from oxyde import F

from app.config import get_settings
from app.oxyde_models.email_verification import OxydeEmailVerificationCode
from app.oxyde_models.user import OxydeUser
from app.services.email_service import EmailService
from app.utils.local_host import is_local_host
from app.utils.datetimes import ensure_utc
from app.utils.email_address import fold_email

logger = logging.getLogger(__name__)

CODE_TTL = timedelta(minutes=15)
MAX_ATTEMPTS = 5
RESEND_INTERVAL = timedelta(seconds=60)
HOURLY_WINDOW = timedelta(hours=1)
HOURLY_LIMIT = 5
FAILURE_WINDOW = timedelta(hours=24)
DAILY_FAILURE_LIMIT = 15
# Admin-issued codes per invitation per FAILURE_WINDOW (CHT-1828).
INVITATION_ISSUE_LIMIT = 3
CODE_DIGITS = 6
_KEY_PURPOSE = b"chaotic-email-verification"


def log_invitation_gate() -> None:
    """Say once, at startup, whether accepting an invitation requires a
    verified address on this server (it does exactly when SMTP is
    configured; see app.api.teams.accept_invitation)."""
    if EmailService().is_configured():
        logger.info(
            "Invitation email-verification gate: ACTIVE (SMTP configured); "
            "accepting a team invitation requires a verified email address."
        )
    else:
        logger.info(
            "Invitation email-verification gate: INACTIVE (no SMTP configured); "
            "an invitation link alone is enough to accept it, so hand links over privately."
        )


def warn_if_app_base_url_is_local() -> None:
    """Warn once at startup when APP_BASE_URL names a local-only host
    (CHT-1822). That means loopback, or 0.0.0.0/:: copied from a bind
    address. The default, http://localhost:24267, is such a host.

    Every absolute link the server builds starts with APP_BASE_URL:
    invitation accept links, and the issue link in a ritual-gate email.
    On such a host nobody on another machine can open them. The host is
    never taken from the request (that would allow Host-header link
    poisoning), so setting APP_BASE_URL is the fix. The wording depends
    on SMTP:

    - With SMTP, those links go out by email as they are, and nothing
      can correct them.
    - Without SMTP, the invitation link is shown to the admin, and the
      web UI and the CLI rebuild it on the address they reached.

    The message names only the host, never a token or a secret."""
    settings = get_settings()
    try:
        host = urlsplit(settings.app_base_url).hostname
    except ValueError:
        return
    if not is_local_host(host):
        return
    fix = "Set APP_BASE_URL to this server's public URL (chaotic system config set APP_BASE_URL https://your-chaotic-host)."
    if EmailService().is_configured():
        logger.warning(
            "APP_BASE_URL names %s, a host only this machine can reach, and SMTP is configured: "
            "emailed links (team invitations, ritual-gate notifications) point there and cannot be "
            "opened from another machine. %s",
            host, fix,
        )
    else:
        logger.warning(
            "APP_BASE_URL names %s, a host only this machine can reach, and SMTP is not configured: "
            "invitation links this server builds point there. The web UI and the CLI correct them "
            "when they reached the server at another address; anything else does not. %s",
            host, fix,
        )


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
# The admin-issued code (CHT-1828) without SMTP: nothing to verify for.
CODE_NOT_NEEDED = VerificationRefused(
    409, "email_verification_unavailable",
    "This server has no SMTP configured, so accepting an invitation does not "
    "require a verified address and no code is needed.",
)
INVALID_CODE_MESSAGE = (
    "That code is wrong, has expired or has been used up. "
    "Check the latest email, or request a new code."
)


def _now() -> datetime:
    return datetime.now(timezone.utc)


def _key() -> bytes:
    """This feature's own key, derived from SECRET_KEY, so its hashes
    cannot be confused with any other HMAC the server makes."""
    return hmac.new(get_settings().secret_key.encode(), _KEY_PURPOSE, hashlib.sha256).digest()


def hash_code(user_id: str, code: str) -> str:
    """HMAC-SHA256 of ``code`` for ``user_id``."""
    return hmac.new(_key(), f"code:{user_id}:{code}".encode(), hashlib.sha256).hexdigest()


def hash_email(email: str) -> str:
    """HMAC-SHA256 of the normalised address: what the limits count by."""
    return hmac.new(_key(), f"email:{fold_email(email)}".encode(), hashlib.sha256).hexdigest()


def hash_invitation_code(user_id: str, invitation_id: str, code: str) -> str:
    """HMAC-SHA256 of an admin-issued ``code``, bound to the user and the
    invitation it lets them accept (CHT-1828)."""
    return hmac.new(_key(), f"invite-code:{user_id}:{invitation_id}:{code}".encode(), hashlib.sha256).hexdigest()


def new_code() -> str:
    return f"{secrets.randbelow(10 ** CODE_DIGITS):0{CODE_DIGITS}d}"


def render_code_email(code: str) -> tuple[str, str]:
    """(subject, body) of the verification email."""
    minutes = int(CODE_TTL.total_seconds() // 60)
    subject = "[Chaotic] Your email verification code"
    body = (
        "Someone signed in to a Chaotic account with this email address and asked\n"
        "to verify it.\n"
        "\n"
        f"Your verification code is: {code}\n"
        "\n"
        f"It expires in {minutes} minutes. Enter it in Chaotic yourself\n"
        "(`chaotic auth verify-email`, or the invitation page).\n"
        "\n"
        "Never share this code with anyone. Chaotic will never ask you for it,\n"
        "by email, chat or phone; whoever asks for it is trying to use your address.\n"
        "\n"
        "If this wasn't you, ignore this email: without the code, the address\n"
        "stays unverified.\n"
        "\n"
        "— Chaotic"
    )
    return subject, body


def _seconds_until(moment: datetime, now: datetime) -> int:
    """Whole seconds until ``moment``, rounded up, so a client that waits
    its Retry-After arrives at or after ``moment``. Every window below is
    strict (a row created exactly a window ago is out of it), so arriving
    exactly at ``moment`` is enough (CHT-1804: the old +0.999 rounding
    could land a fraction short, and a retry got one more 429)."""
    return max(1, math.ceil((moment - now).total_seconds()))


def _rate_limited(message: str, retry: int) -> VerificationRefused:
    return VerificationRefused(
        429, "email_verification_rate_limited", message, headers={"Retry-After": str(retry)},
    )


def _failures(rows) -> int:
    """Failed confirmations recorded on ``rows``: every try but a success."""
    return sum(r.attempts - (1 if r.used_at is not None else 0) for r in rows)


def _failure_cap_lapses_at(rows) -> datetime | None:
    """When the address drops back under the daily failure cap, or None
    if it is under it now. ``rows`` are its codes in the window, oldest
    first; a code's failures leave the window with it (they all happened
    within its TTL of its ``created_at``)."""
    remaining = _failures(rows)
    if remaining < DAILY_FAILURE_LIMIT:
        return None
    for row in rows:
        remaining -= _failures([row])
        if remaining < DAILY_FAILURE_LIMIT:
            return ensure_utc(row.created_at) + FAILURE_WINDOW
    return None  # pragma: no cover -- the loop always gets under the cap


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
        email_hash = hash_email(user.email)
        codes = OxydeEmailVerificationCode.objects
        await codes.filter(created_at__lte=now - FAILURE_WINDOW).delete()

        # Over the day's failure cap a code could not be confirmed anyway:
        # say when it lapses instead of mailing a dead one.
        history = await codes.filter(
            email_hash=email_hash, invitation_id__isnull=True,
        ).order_by("created_at").all()
        lapses_at = _failure_cap_lapses_at(history)
        if lapses_at is not None:
            retry = _seconds_until(lapses_at, now)
            raise _rate_limited(
                "Too many wrong codes for this address today. "
                f"Try again in {(retry + 3599) // 3600} h.", retry,
            )

        # Insert first (unarmed: nothing can confirm it yet), then count:
        # two requests racing each other then both see the other's row,
        # and at worst both are refused, never both sent.
        code = new_code()
        row = await codes.create(
            email_hash=email_hash,
            user_id=user.id,
            code_hash=hash_code(user.id, code),
            armed=False,
            expires_at=now + CODE_TTL,
            attempts=0,
            created_at=now,
        )
        recent = await codes.filter(
            email_hash=email_hash, invitation_id__isnull=True, created_at__gt=now - HOURLY_WINDOW,
        ).order_by("created_at").all()
        others = [r for r in recent if r.id != row.id]
        refusal = None
        if others and ensure_utc(others[-1].created_at) > now - RESEND_INTERVAL:
            retry = _seconds_until(ensure_utc(others[-1].created_at) + RESEND_INTERVAL, now)
            refusal = _rate_limited(
                f"A code was sent less than a minute ago. Wait {retry} s before asking for another.", retry,
            )
        elif len(others) >= HOURLY_LIMIT:
            retry = _seconds_until(ensure_utc(others[-HOURLY_LIMIT].created_at) + HOURLY_WINDOW, now)
            refusal = _rate_limited(
                f"Too many codes requested in the last hour ({HOURLY_LIMIT} at most). "
                f"Try again in {(retry + 59) // 60} min.", retry,
            )
        if refusal is not None:
            await codes.filter(id=row.id).delete()
            raise refusal

        subject, body = render_code_email(code)
        if not await self.email.send(user.email, subject, body):
            # Never delivered: it stays unarmed, but kept as history so a
            # failing relay is not hammered faster than the limits allow.
            raise VerificationRefused(
                502, "email_send_failed",
                "The verification email could not be sent: the server's mail relay failed. "
                "Try again later, or ask the server's operator to check its SMTP settings.",
            )
        await codes.filter(id=row.id).update(armed=True)
        return row

    @staticmethod
    async def asked_recently(user_id: str, email: str, since: datetime) -> bool:
        """Whether this account asked for a mailed code itself after
        ``since`` (the invitation's creation) and within the last
        ``FAILURE_WINDOW``, sent or not (CHT-1828). A stuck invitee asks
        after being invited; an account that asked before this invitation
        existed, or never, is not described to whoever invited its
        address (second review, 1). Only its own requests count:
        admin-issued rows (``invitation_id`` set) are excluded, so issuing
        one never extends the window (first review, 2).

        Always one query, whatever ``user_id`` is, so a caller with no
        account to ask about can run it too (first review, 6)."""
        after = max(_now() - FAILURE_WINDOW, ensure_utc(since))
        return await OxydeEmailVerificationCode.objects.filter(
            email_hash=hash_email(email), invitation_id__isnull=True,
            user_id=user_id, created_at__gt=after,
        ).first() is not None

    async def issue_for_invitation(
        self, user: OxydeUser, invitation_id: str, team_id: str, invited_email: str,
    ) -> tuple[str, OxydeEmailVerificationCode]:
        """Make a code that lets ``user`` accept invitation
        ``invitation_id`` and nothing else, and return it with its row,
        for a team admin to hand over when the mailed code cannot arrive
        (CHT-1828).

        It does **not** verify the address: confirming it never sets
        ``email_verified_at`` (first review, 1). Whoever issues it is a
        team admin, and anyone can be one of their own team, so the most
        it may vouch for is entry to that admin's own invitation, which
        they could grant anyway. Every other invitation still needs the
        mailed code.

        The row carries ``invitation_id`` and ``team_id`` (migration
        0037), and every address-keyed query excludes such rows, so none
        sees it: it does not disarm or outrank the account's mailed
        codes, its wrong tries do not count against the address's daily
        failure cap, and it is not a request of the account's own
        (``asked_recently``). Stored only as an HMAC bound to the user id
        and the invitation, ``CODE_TTL`` long, ``MAX_ATTEMPTS`` tries. A
        new one disarms this invitation's earlier unconfirmed ones.

        At most ``INVITATION_ISSUE_LIMIT`` per team and invited address
        per ``FAILURE_WINDOW`` (429 with Retry-After), so cancelling and
        inviting again does not reset it (second review, 4), and another
        team's codes for the address never use up this team's. That
        bounds a team's guesses at an address to that many times
        ``MAX_ATTEMPTS`` a day.

        Raises VerificationRefused: 409 without SMTP (then no invitation
        needs a verified address), 429 over the limit.
        """
        if not self.email.is_configured():
            raise CODE_NOT_NEEDED

        now = _now()
        codes = OxydeEmailVerificationCode.objects
        await codes.filter(created_at__lte=now - FAILURE_WINDOW).delete()

        email_hash = hash_email(invited_email)
        issued = await codes.filter(
            team_id=team_id, email_hash=email_hash, invitation_id__isnull=False,
        ).order_by("created_at").all()
        if len(issued) >= INVITATION_ISSUE_LIMIT:
            retry = _seconds_until(ensure_utc(issued[-INVITATION_ISSUE_LIMIT].created_at) + FAILURE_WINDOW, now)
            raise _rate_limited(
                f"Too many codes issued for this address by this team today ({INVITATION_ISSUE_LIMIT} "
                f"at most). Try again in {(retry + 3599) // 3600} h.", retry,
            )

        await codes.filter(invitation_id=invitation_id, used_at__isnull=True, armed=True).update(armed=False)
        code = new_code()
        row = await codes.create(
            email_hash=email_hash,
            invitation_id=invitation_id,
            team_id=team_id,
            user_id=user.id,
            code_hash=hash_invitation_code(user.id, invitation_id, code),
            armed=True,
            expires_at=now + CODE_TTL,
            attempts=0,
            created_at=now,
        )
        return code, row

    @staticmethod
    async def redeem_for_invitation(user: OxydeUser, invitation_id: str, code: str) -> str:
        """Spend ``code`` against this invitation's newest admin-issued
        code for ``user`` (CHT-1828). Returns:

        * ``"ok"``: a match, which lets ``user`` past the verification gate
          for this one invitation; the address stays unverified.
        * ``"wrong"``: a live one exists and this is not it (one of its
          ``MAX_ATTEMPTS`` spent, nothing counted against the address).
        * ``"stale"``: one was issued for this user and invitation in the
          last ``FAILURE_WINDOW`` but none is live (expired, used up or
          superseded). The caller says to ask the admin for a new one and
          does not try the code as a mailed one, which would spend a
          mailed code's attempt (second review, 2).
        * ``"none"``: none was issued for this user and invitation, so the
          code can only be a mailed one.

        Only rows for this user count, so the answer to another account
        holding the link says nothing about whether a code was issued."""
        now = _now()
        codes = OxydeEmailVerificationCode.objects
        mine = codes.filter(invitation_id=invitation_id, user_id=user.id)
        latest = await mine.filter(armed=True).order_by("-created_at").first()
        if (
            latest is None or latest.used_at is not None
            or latest.attempts >= MAX_ATTEMPTS or ensure_utc(latest.expires_at) <= now
        ):
            return "stale" if await mine.first() is not None else "none"
        spent = await codes.filter(id=latest.id, attempts__lt=MAX_ATTEMPTS, used_at__isnull=True).update(
            attempts=F("attempts") + 1,
        )
        if not spent:
            return "stale"
        if not hmac.compare_digest(latest.code_hash, hash_invitation_code(user.id, invitation_id, code.strip())):
            return "wrong"
        await codes.filter(id=latest.id).update(used_at=now)
        return "ok"

    async def confirm(self, user: OxydeUser, code: str) -> OxydeUser:
        """Check ``code`` against the user's newest sent code; on a match
        mark the address verified. A wrong, expired, dead, superseded or
        missing code, and any code once the address is over its daily
        failure cap, all get the same 400 ``invalid_verification_code``.
        """
        if user.email_verified_at is not None:
            raise VerificationRefused(409, "email_already_verified", "Your email address is already verified.")
        invalid = VerificationRefused(400, "invalid_verification_code", INVALID_CODE_MESSAGE)
        now = _now()
        email_hash = hash_email(user.email)
        codes = OxydeEmailVerificationCode.objects

        history = await codes.filter(
            email_hash=email_hash, invitation_id__isnull=True, created_at__gt=now - FAILURE_WINDOW,
        ).all()
        if _failures(history) >= DAILY_FAILURE_LIMIT:
            raise invalid

        latest = await codes.filter(
            email_hash=email_hash, invitation_id__isnull=True, user_id=user.id, armed=True,
        ).order_by("-created_at").first()
        if latest is None or latest.used_at is not None or ensure_utc(latest.expires_at) <= now:
            raise invalid
        # Spend an attempt before comparing, conditionally, so concurrent
        # guesses cannot get past the cap between a read and a write.
        # Not expired since `latest` was read, either. (This is not what
        # stops an address change racing this confirm: change_email
        # expires codes at its own, later, time. The conditional write
        # at the end is that guard.)
        spent = await codes.filter(
            id=latest.id, attempts__lt=MAX_ATTEMPTS, used_at__isnull=True, expires_at__gt=now,
        ).update(attempts=F("attempts") + 1)
        if not spent:
            raise invalid
        if not hmac.compare_digest(latest.code_hash, hash_code(user.id, code.strip())):
            raise invalid

        await codes.filter(id=latest.id).update(used_at=now)
        # Only if the account still has the address the code was mailed
        # to: an address change racing this confirm must not end with
        # the new address verified by the old one's code (PR #450
        # review, 1). Nothing written means it moved: the code is no
        # longer good for it.
        verified = await OxydeUser.objects.filter(
            id=user.id, email=user.email, email_verified_at__isnull=True,
        ).update(email_verified_at=now, updated_at=now)
        if not verified:
            raise invalid
        await user.refresh()
        return user
