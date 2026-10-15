"""User service for user management.

Uses Oxyde ORM (Phase 1 migration from SQLAlchemy).
"""
import logging
from datetime import datetime, timezone
from oxyde import IntegrityError, execute_raw
from app.oxyde_models.user import OxydeUser
from app.schemas.user import UserCreate, UserUpdate
from app.utils.email_address import fold_email
from app.utils.security import get_password_hash, verify_password
from app.oxyde_models.team import OxydeTeamMember
from app.oxyde_models.api_key import OxydeAPIKey
from app.oxyde_models.email_verification import OxydeEmailVerificationCode
from app.oauth.ratelimit import SlidingWindowLimiter
from app.services.email_service import EmailService, fire_and_forget
from app.services.agent_service import AgentService, describe_counts
from app.services.credential_events import revoking
from app.services.revocation_service import REASON_PRINCIPAL_DELETED, RevocationService

# Type alias: callers still see "User" but it's now an Oxyde model
User = OxydeUser

logger = logging.getLogger(__name__)


async def give_free_addresses_to_legacy_accounts() -> list[str]:
    """Set ``email_folded`` on each account migration 0034 left without
    one whose address no account holds any more (CHT-1827), oldest
    first, and return their ids.

    An account is left NULL because an older account held its address,
    ignoring case. Once that account is deleted, or changes its own
    address, the address is free, and the next oldest account at it
    takes it, so the unique index covers it and the startup warning
    stops counting it. Called after an account is deleted or changes its
    address, and at startup (which also covers a row deleted by hand).

    Never changes ``email``. An address that cannot be folded (not text,
    or with a NUL character, as 0034 skips) is left alone. A concurrent
    writer that takes the address first wins: the unique index refuses
    this row's UPDATE, and it stays NULL."""
    rows = await execute_raw(
        "SELECT id, email FROM users WHERE email_folded IS NULL AND typeof(email) = 'text' "
        "ORDER BY created_at, id", [],
    )
    claimed: list[str] = []
    for row in rows:
        email = row["email"]
        if "\x00" in email:
            continue
        folded = fold_email(email)
        if not folded or await OxydeUser.objects.filter(email_folded=folded).first() is not None:
            continue
        try:
            updated = await OxydeUser.objects.filter(
                id=row["id"], email_folded__isnull=True,
            ).update(email_folded=folded)
        except (IntegrityError, RuntimeError) as error:  # QuerySet.update raises the latter
            if not _is_address_collision(error):
                raise
            continue
        if updated:
            claimed.append(row["id"])
    if claimed:
        logger.info(
            "account(s) %s now hold their email address: the older account at it is gone (CHT-1827)",
            ", ".join(claimed),
        )
    return claimed


async def _give_free_addresses_safely() -> None:
    """``give_free_addresses_to_legacy_accounts`` after a write that freed
    an address; a failure is logged, not raised (the write stands, and
    the next startup tries again)."""
    try:
        await give_free_addresses_to_legacy_accounts()
    except Exception:
        logger.exception("could not give freed email addresses to the accounts that share them")


async def warn_if_accounts_share_an_address() -> int:
    """At startup: give each account without ``email_folded`` its address
    if it is free now (``give_free_addresses_to_legacy_accounts``), then
    log a warning naming how many still have none (CHT-1804), and return
    that count. Migration 0034 leaves it NULL on every account whose
    address differs only in case from an older account's; such accounts
    still share one email-verification rate limit with it.
    ``chaotic system audit shared-addresses`` lists them by id.
    """
    await give_free_addresses_to_legacy_accounts()
    count = await OxydeUser.objects.filter(email_folded__isnull=True).count()
    if count:
        logger.warning(
            "%d account(s) share an email address, ignoring case, with an older account "
            "(users.email_folded is NULL). They keep working, but share the older account's "
            "email-verification limits. `chaotic system audit shared-addresses` on the server "
            "lists them by id; ask each one's owner to change its address with "
            "`chaotic auth change-email` (CHT-1827).",
            count,
        )
    return count


def _label(user: OxydeUser) -> str:
    """'Name' (id prefix): names are not unique, ids are unreadable."""
    return f"'{user.name}' ({user.id[:8]})"


class UserDeletionRefusedError(Exception):
    """Refused (CHT-1467): deleting the user would erase who wrote
    something -- the user, or an agent they own, authored work (the agent
    rule is CHT-1427's) -- or would have to delete a user row that names
    them as its parent but is not an agent.

    `counts` is the user's own authored_counts(); `agent_counts` maps the
    id of each agent that authored anything to its counts, and
    `agent_names` that id to the agent's name; `non_agent_children` lists
    the ids of rows with parent_user_id = the user and is_agent false.
    """

    def __init__(
        self,
        user: OxydeUser,
        counts: dict[str, int],
        agents_with_work: list[tuple[OxydeUser, dict[str, int]]],
        non_agent_children: list[OxydeUser],
    ):
        self.counts = counts
        self.agent_counts = {agent.id: per_agent for agent, per_agent in agents_with_work}
        self.agent_names = {agent.id: agent.name for agent, _ in agents_with_work}
        self.non_agent_children = [child.id for child in non_agent_children]
        reasons = []
        if any(counts.values()):
            reasons.append(f"it authored {describe_counts(counts)}")
        for agent, per_agent in agents_with_work:
            reasons.append(f"its agent {_label(agent)} authored {describe_counts(per_agent)}")
        if non_agent_children:
            listed = ", ".join(_label(child) for child in non_agent_children)
            reasons.append(
                f"user(s) {listed} name it as their parent but are not agents, so deleting it "
                "would delete them (an operator must clear their parent_user_id)"
            )
        detail = "; ".join(reasons)
        tail = (
            " Deleting the account would leave that work without an author."
            if any(counts.values()) or agents_with_work else ""
        )
        super().__init__(f"User {_label(user)} cannot be deleted: {detail}.{tail}")


def _is_address_collision(error: Exception) -> bool:
    """Is ``error`` SQLite's UNIQUE failure on users.email or
    users.email_folded? (Its message names the columns:
    ``UNIQUE constraint failed: users.email_folded``.)"""
    message = str(error)
    return "UNIQUE constraint failed" in message and any(
        column in message for column in ("users.email_folded", "users.email")
    )


class EmailTakenError(Exception):
    """The address already belongs to an account, ignoring (ASCII) case
    (CHT-1790). Raised by UserService.create when the database's unique
    indexes refuse the row, which is how a signup that raced another one
    for the same address ends (CHT-1804)."""


class EmailChangeRefused(Exception):
    """A change of address refused (CHT-1827). ``status_code`` and
    ``error_code`` say how; ``email_change_refused`` is the one answer to
    both a wrong password and an address another account holds, so the
    route is no oracle for which addresses have accounts."""

    def __init__(self, status_code: int, error_code: str, message: str, headers: dict | None = None):
        super().__init__(message)
        self.status_code = status_code
        self.error_code = error_code
        self.message = message
        self.headers = headers

    def detail(self) -> dict:
        return {"error_code": self.error_code, "message": self.message}


# Tries per account per hour, wrong passwords included: the password
# check here must not be a faster guess than login.
EMAIL_CHANGE_ATTEMPTS_PER_HOUR = 5
# Changes per account per day: each one mails a notice to the address
# left, so this bounds the mail one account can send to addresses it
# names.
EMAIL_CHANGES_PER_DAY = 3
# In-process, like app.oauth.ratelimit's: a server run as several workers
# allows each its own budget, still a bound. Tests clear them.
email_change_attempts = SlidingWindowLimiter(3600)
email_changes = SlidingWindowLimiter(86400)


def _email_change_refused() -> EmailChangeRefused:
    return EmailChangeRefused(
        400, "email_change_refused",
        "The address was not changed: the password is wrong, or the address cannot be used.",
    )


def render_email_changed_notice() -> tuple[str, str]:
    """(subject, body) of the notice mailed to the address an account
    left (CHT-1827). It names neither the account nor the new address:
    whoever reads the old mailbox may not be the account's owner."""
    subject = "[Chaotic] Your account's email address was changed"
    body = (
        "The Chaotic account that used this email address now uses a different one.\n"
        "Mail for the account no longer comes here, and this address no longer signs in to it.\n"
        "\n"
        "If you made this change, there is nothing to do.\n"
        "\n"
        "If you did not, someone who knows the account's password changed it:\n"
        "contact the operator of your Chaotic server.\n"
        "\n"
        "— Chaotic"
    )
    return subject, body


class UserService:
    """Service for user operations."""

    def __init__(self, db=None):
        # db parameter kept for API compatibility during migration.
        # Oxyde uses a global connection registry, no session injection needed.
        pass

    async def create(self, user_in: UserCreate) -> OxydeUser:
        """Create a new user.

        EmailTakenError if an account already has this address, ignoring
        case: `users.email_folded` is unique (migration 0034, CHT-1804),
        so two signups racing for `bob@x` and `Bob@x` cannot both land.
        """
        # Pass timestamps explicitly: the installed Oxyde version doesn't
        # apply `default_factory` defaults on objects.create(), so the
        # NOT NULL constraints on users.created_at / users.updated_at
        # blow up the INSERT otherwise.
        now = datetime.now(timezone.utc)
        try:
            user = await OxydeUser.objects.create(
                email=user_in.email,
                email_folded=fold_email(user_in.email),
                hashed_password=get_password_hash(user_in.password),
                name=user_in.name,
                created_at=now,
                updated_at=now,
            )
        except IntegrityError as error:
            # Only a collision on the address itself means "taken":
            # users.email or users.email_folded (ux_users_email_folded).
            # Anything else is a real fault and stays one.
            if not _is_address_collision(error):
                raise
            raise EmailTakenError(user_in.email) from error
        await user.refresh()
        return user

    async def get_by_id(self, user_id: str) -> OxydeUser | None:
        """Get user by ID."""
        return await OxydeUser.objects.get_or_none(id=user_id)

    async def get_by_email(self, email: str) -> OxydeUser | None:
        """Get user by email."""
        return await OxydeUser.objects.get_or_none(email=email)

    async def find_by_email_ignoring_case(self, email: str) -> list[OxydeUser]:
        """Every account whose address equals ``email`` ignoring (ASCII)
        case (CHT-1790), oldest first. Normally none or one; more only for
        accounts made before signup refused case variants.

        Looked up by ``email_folded`` (CHT-1804), an exact match on a
        unique index, plus the accounts migration 0034 left without one
        (normally none). Not ``email__iexact``: Oxyde lowercases its
        argument with Python's Unicode ``lower()`` but SQLite's
        ``LOWER()`` folds ASCII only, so an address with a non-ASCII
        capital (``Ärger@x``) never matched itself. The Python
        comparison decides in every case.
        """
        folded = fold_email(email)
        if not folded:
            return []
        rows = await OxydeUser.objects.filter(email_folded=folded).all()
        # The NULL rows are matched on (id, email) first and only the
        # matches loaded as models: a row 0034 could not read (a BLOB
        # address) would fail model validation and must not break every
        # lookup.
        legacy = await execute_raw(
            "SELECT id, email FROM users WHERE email_folded IS NULL AND typeof(email) = 'text'", [],
        )
        legacy_ids = [row["id"] for row in legacy if fold_email(row["email"]) == folded]
        if legacy_ids:
            rows += await OxydeUser.objects.filter(id__in=legacy_ids).all()
        matches = [user for user in rows if fold_email(user.email) == folded]
        return sorted(matches, key=lambda user: (user.created_at, user.id))

    async def get_by_email_ignoring_case(self, email: str) -> OxydeUser | None:
        """The account at ``email``: an exact match first, else the one
        account that matches ignoring case, else None (none, or several
        made before case variants were refused)."""
        exact = await self.get_by_email(email)
        if exact is not None:
            return exact
        matches = await self.find_by_email_ignoring_case(email)
        return matches[0] if len(matches) == 1 else None

    async def authenticate(self, email: str, password: str) -> OxydeUser | None:
        """Authenticate a user, by their address in any case."""
        user = await self.get_by_email_ignoring_case(email)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

    async def update(self, user: OxydeUser, user_in: UserUpdate) -> OxydeUser:
        """Update a user."""
        update_data = user_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(user, field, value)
        user.updated_at = datetime.now(timezone.utc)
        await user.save(update_fields=set(update_data.keys()) | {"updated_at"})
        if "name" in update_data:
            # Inbox entries show who triggered them (CHT-1607).
            from app.services.inbox_service import InboxService
            await InboxService().touch_safely(source_user_id=user.id)
        await user.refresh()
        return user

    async def change_email(self, user: OxydeUser, new_email: str, password: str) -> OxydeUser:
        """Change ``user``'s own address to ``new_email`` (CHT-1827), after
        checking ``password``. Raises EmailChangeRefused:

        * 403 ``human_required``: an agent, or an account with no
          password to confirm with.
        * 429 ``email_change_rate_limited``: over
          ``EMAIL_CHANGE_ATTEMPTS_PER_HOUR`` tries or
          ``EMAIL_CHANGES_PER_DAY`` changes (checked before the password,
          so it says nothing about the address).
        * 400 ``email_change_refused``: a wrong password, or an address
          another account holds ignoring case (one answer for both).
        * 400 ``email_unchanged``: ``new_email`` is the account's address
          already, exactly.

        In one write: ``email``, ``email_folded``, and
        ``email_verified_at`` cleared (a verification of the old address
        must not vouch for the new one). Then every code still live for
        the account is expired, so none sent to the old address can be
        confirmed later; the notice is mailed to the old address when
        SMTP is configured; and an account 0034 left without an address
        at the old one takes it. Sessions and keys are untouched. Logged
        by account id only.
        """
        if user.is_agent or not user.hashed_password:
            raise EmailChangeRefused(
                403, "human_required",
                "Only a person's account with a password can change its address.",
            )
        if (
            email_change_attempts.is_full(user.id, EMAIL_CHANGE_ATTEMPTS_PER_HOUR)
            or email_changes.is_full(user.id, EMAIL_CHANGES_PER_DAY)
        ):
            raise EmailChangeRefused(
                429, "email_change_rate_limited",
                f"Too many address changes: at most {EMAIL_CHANGE_ATTEMPTS_PER_HOUR} tries an hour "
                f"and {EMAIL_CHANGES_PER_DAY} changes a day. Try again later.",
                headers={"Retry-After": "3600"},
            )
        email_change_attempts.allow(user.id, EMAIL_CHANGE_ATTEMPTS_PER_HOUR)
        password_ok = verify_password(password, user.hashed_password)
        held_elsewhere = any(
            other.id != user.id for other in await self.find_by_email_ignoring_case(new_email)
        )
        if not password_ok or held_elsewhere:
            raise _email_change_refused()
        if new_email == user.email:
            raise EmailChangeRefused(400, "email_unchanged", "That is already your account's address.")

        old_email = user.email
        now = datetime.now(timezone.utc)
        try:
            await OxydeUser.objects.filter(id=user.id).update(
                email=new_email, email_folded=fold_email(new_email),
                email_verified_at=None, updated_at=now,
            )
        except (IntegrityError, RuntimeError) as error:  # QuerySet.update raises the latter
            # Another account took the address since the check above.
            if not _is_address_collision(error):
                raise
            raise _email_change_refused() from error
        email_changes.allow(user.id, EMAIL_CHANGES_PER_DAY)
        # Mailed codes are bound to the old address's hash and stop
        # matching on their own; expire every live one (an admin-issued
        # invitation code included) so none outlives the change.
        await OxydeEmailVerificationCode.objects.filter(
            user_id=user.id, used_at__isnull=True, expires_at__gt=now,
        ).update(expires_at=now)
        logger.info("account %s changed its email address (CHT-1827)", user.id)
        email_service = EmailService()
        if email_service.is_configured():
            subject, body = render_email_changed_notice()
            fire_and_forget(email_service.send(old_email, subject, body))
        await _give_free_addresses_safely()
        await user.refresh()
        return user

    async def delete(self, user: OxydeUser) -> None:
        """Delete a user, their agents and their memberships and API keys
        -- only if neither they nor any of their agents authored anything.
        Invitations to their address are kept (CHT-1796).

        Otherwise UserDeletionRefusedError (CHT-1467): the same rule
        AgentService.delete applies to one agent, applied to the account
        and every agent it owns, so deleting the owner cannot be used to
        get around it. The agents are deleted here, explicitly; the
        database's users.parent_user_id is ON DELETE RESTRICT (0020), so
        deleting a human who still has agents fails rather than cascades.
        A row naming the user as parent that is not an agent is never
        deleted along with them: its presence refuses the delete too.
        """
        agent_service = AgentService()
        async with revoking():
            # Every row that names the user as parent, agent or not: the
            # RESTRICT applies to all of them (CHT-1467's review).
            children = await OxydeUser.objects.filter(
                parent_user_id=user.id
            ).order_by("created_at").all()
            agents = [child for child in children if child.is_agent]
            non_agent_children = [child for child in children if not child.is_agent]
            counts = await agent_service.authored_counts(user.id)
            agents_with_work = []
            for agent in agents:
                per_agent = await agent_service.authored_counts(agent.id)
                if any(per_agent.values()):
                    agents_with_work.append((agent, per_agent))
            if any(counts.values()) or agents_with_work or non_agent_children:
                raise UserDeletionRefusedError(user, counts, agents_with_work, non_agent_children)
            # Identities they (as a person registering for themself) or any
            # of their registrars registered are retired, not left alive
            # without a registrar (CHT-1498); ones they own are deleted
            # below with their other agents.
            await agent_service._retire_identities(user.id)
            # The deletes below cascade their sessions away; revoking them
            # first moves the revocation epoch, so no cached validation
            # outlives the account (CHT-1523).
            revocations = RevocationService()
            await revocations.revoke_for_principals(
                [user.id], actor_id=None, reason=REASON_PRINCIPAL_DELETED, as_holder=True,
            )
            await revocations.revoke_for_principals(
                [agent.id for agent in agents], actor_id=None, reason=REASON_PRINCIPAL_DELETED,
            )
            for agent in agents:
                await agent_service._retire_identities(agent.id)
                await OxydeAPIKey.objects.filter(principal_user_id=agent.id).delete()
                await agent.delete()
            await OxydeTeamMember.objects.filter(user_id=user.id).delete()
            # Invitations *to* their address are left alone: they belong
            # to the inviting team, expire on their own, and signup never
            # proved the address, so deleting them let anyone sign up as
            # a pending invitee and wipe their invitations on every team
            # (CHT-1796). Invitations they sent go with the account
            # through team_invitations.invited_by's ON DELETE CASCADE.
            # Their own keys, and the ones they hold for other people's
            # agents (CHT-1537).
            await OxydeAPIKey.objects.filter(principal_user_id=user.id).delete()
            await OxydeAPIKey.objects.filter(holder_user_id=user.id).delete()
            await user.delete()
        # Their address is free now: an account 0034 left without one,
        # at the same address ignoring case, takes it (CHT-1827).
        # Fail-soft: the delete has happened; startup retries.
        await _give_free_addresses_safely()

    async def list_users(self, skip: int = 0, limit: int = 100) -> list[OxydeUser]:
        """List all users."""
        return await OxydeUser.objects.offset(skip).limit(limit).all()
