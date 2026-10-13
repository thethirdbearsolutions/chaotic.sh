"""Revocation cascades (CHT-1523; design doc "MCP OAuth and token
service: design" §4.3, threats S7 and S12).

The schema cascades only *deletes*: a holder session or token goes when
its principal, holder, team, client or key row is deleted. Revoking a key
(``is_active`` false), deactivating or retiring an agent, or removing a
member from a team deletes nothing, so without this module every holder
session and unredeemed claim ticket those produced would live on, held
off only by the credential resolver's per-request checks. This module
ends them explicitly, each session through ``TokenService.revoke_session``
(which writes a ``revocation_events`` row and so moves the revocation
epoch), and records one more event for the action that caused the
cascade, with its counts.

The cascades:

* an ``api_keys`` row revoked: the holder sessions opened with it
  (``credential_id``) and the unredeemed claim tickets it minted
  (``minted_by_credential_id``);
* a principal deactivated or retired (an agent, or an identity retired
  with its registrar): every holder session acting as it, and every
  unredeemed code or ticket that would start one;
* a member removed from a team: every holder session in that team that
  they answer for (``holder_user_id``: the connections they consented
  to, and claims made with their keys), the unredeemed codes and tickets
  they would answer for there, and the keys of theirs the removal revoked
  (``AgentService.release_member_agents``), as above.

Call these inside the transaction that makes the change they follow,
after that change's first write: the revocation event's ``seq`` is
assigned there (see ``OxydeRevocationEvent.seq``). Each session is
revoked in a nested ``atomic()`` (a savepoint), so a rollback of the
outer transaction rolls the revocations back with the change.

Not here yet (CHT-1449): the admin view, bulk revocation with dry-run,
and revoking an OAuth client or a grant.
"""
from __future__ import annotations

import json
from collections.abc import Iterable
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone

from app.config import get_settings

from app.enums import HolderVia, RevocationTarget, TokenKind
from app.oxyde_models.oauth import OxydeAuthToken, OxydeHolderSession, OxydeRevocationEvent
from app.services.token_service import TokenService, revocation_epoch

REASON_KEY_REVOKED = "key_revoked"
REASON_PRINCIPAL_DEACTIVATED = "principal_deactivated"
REASON_PRINCIPAL_DELETED = "principal_deleted"
REASON_MEMBER_REMOVED = "member_removed"
REASON_USER_REVOKED = "user_revoked"

# Single-use tokens that would start a new holder session if redeemed.
_STARTERS = (TokenKind.AUTH_CODE, TokenKind.CLAIM_TICKET)


@dataclass
class CascadeCounts:
    """What one cascade revoked."""

    holder_sessions: int = 0
    tokens: int = 0  # unredeemed authorization codes and claim tickets

    def __iadd__(self, other: "CascadeCounts") -> "CascadeCounts":
        self.holder_sessions += other.holder_sessions
        self.tokens += other.tokens
        return self

    @property
    def total(self) -> int:
        return self.holder_sessions + self.tokens

    def as_json(self) -> str:
        return json.dumps({"holder_sessions": self.holder_sessions, "tokens": self.tokens})


def _now() -> datetime:
    return datetime.now(timezone.utc)


class RevocationService:
    """Explicit revocation cascades. See the module docstring."""

    def __init__(self, token_service: TokenService | None = None):
        self.tokens = token_service or TokenService()

    # --- primitives ----------------------------------------------------------

    async def _revoke_sessions(self, sessions: Iterable[OxydeHolderSession], *, actor_id, reason) -> int:
        revoked = 0
        for session in sessions:
            if await self.tokens.revoke_session(session.id, actor_id=actor_id, reason=reason):
                revoked += 1
        return revoked

    async def _revoke_starters(self, **filters) -> int:
        """Revoke unredeemed, unexpired codes and tickets matching `filters`.
        A redeemed one is already its session's, and goes with it."""
        now = _now()
        return await OxydeAuthToken.objects.filter(
            kind__in=list(_STARTERS), used_at__isnull=True, revoked_at__isnull=True, expires_at__gt=now,
            **filters,
        ).update(revoked_at=now)

    async def _record(self, counts: CascadeCounts, *, target_type, target_id, team_id, actor_id, reason) -> None:
        """One event for the action behind a cascade, when it revoked
        anything (each session also has its own)."""
        if counts.total == 0:
            return
        await OxydeRevocationEvent.objects.create(
            seq=await revocation_epoch() + 1,
            team_id=team_id,
            actor_id=actor_id,
            target_type=target_type,
            target_id=target_id,
            cascade_counts=counts.as_json(),
            reason=reason,
        )

    # --- cascades ------------------------------------------------------------

    async def revoke_for_keys(
        self, key_ids: Iterable[str], *, actor_id: str | None, reason: str = REASON_KEY_REVOKED,
    ) -> CascadeCounts:
        """Keys that were just revoked: end the sessions opened with them
        and the unredeemed tickets they minted."""
        total = CascadeCounts()
        for key_id in dict.fromkeys(key_ids):
            sessions = await OxydeHolderSession.objects.filter(
                credential_id=key_id, revoked_at__isnull=True,
            ).all()
            counts = CascadeCounts(
                holder_sessions=await self._revoke_sessions(sessions, actor_id=actor_id, reason=reason),
                tokens=await self._revoke_starters(minted_by_credential_id=key_id),
            )
            await self._record(
                counts, target_type=RevocationTarget.API_KEY, target_id=key_id,
                team_id=sessions[0].team_id if sessions else None, actor_id=actor_id, reason=reason,
            )
            total += counts
        return total

    async def revoke_for_principals(
        self, user_ids: Iterable[str], *, actor_id: str | None, reason: str = REASON_PRINCIPAL_DEACTIVATED,
    ) -> CascadeCounts:
        """Principals that were just deactivated or retired (or are about
        to be deleted): end every session acting as them, and every
        unredeemed code or ticket that would start one."""
        total = CascadeCounts()
        for user_id in dict.fromkeys(user_ids):
            sessions = await OxydeHolderSession.objects.filter(
                principal_user_id=user_id, revoked_at__isnull=True,
            ).all()
            counts = CascadeCounts(
                holder_sessions=await self._revoke_sessions(sessions, actor_id=actor_id, reason=reason),
                tokens=await self._revoke_starters(principal_user_id=user_id),
            )
            await self._record(
                counts, target_type=RevocationTarget.IDENTITY, target_id=user_id,
                team_id=sessions[0].team_id if sessions else None, actor_id=actor_id, reason=reason,
            )
            total += counts
        return total

    async def revoke_for_holder(
        self, user_id: str, *, actor_id: str | None, reason: str = REASON_PRINCIPAL_DELETED,
    ) -> CascadeCounts:
        """A human about to be deleted: end every session they answer for,
        in any team. (The delete would cascade them away anyway; this
        moves the revocation epoch so no cached validation outlives it.)"""
        sessions = await OxydeHolderSession.objects.filter(
            holder_user_id=user_id, revoked_at__isnull=True,
        ).all()
        counts = CascadeCounts(
            holder_sessions=await self._revoke_sessions(sessions, actor_id=actor_id, reason=reason),
            tokens=await self._revoke_starters(holder_user_id=user_id),
        )
        await self._record(
            counts, target_type=RevocationTarget.IDENTITY, target_id=user_id, team_id=None,
            actor_id=actor_id, reason=reason,
        )
        return counts

    async def revoke_for_member(
        self, team_id: str, user_id: str, *, revoked_key_ids: Iterable[str] = (), actor_id: str | None,
    ) -> CascadeCounts:
        """`user_id` was just removed from `team_id` (or left it): end the
        sessions they answer for in that team, the codes and tickets they
        would answer for there, and what the keys the removal revoked had
        opened (design §4.3, S12)."""
        reason = REASON_MEMBER_REMOVED
        sessions = await OxydeHolderSession.objects.filter(
            team_id=team_id, holder_user_id=user_id, revoked_at__isnull=True,
        ).all()
        counts = CascadeCounts(
            holder_sessions=await self._revoke_sessions(sessions, actor_id=actor_id, reason=reason),
            tokens=await self._revoke_starters(team_id=team_id, holder_user_id=user_id),
        )
        counts += await self.revoke_for_keys(revoked_key_ids, actor_id=actor_id, reason=reason)
        await self._record(
            counts, target_type=RevocationTarget.MEMBER, target_id=user_id, team_id=team_id,
            actor_id=actor_id, reason=reason,
        )
        return counts

    # --- a human's own connections (Connected apps) --------------------------

    async def list_connections(self, user_id: str) -> list[OxydeHolderSession]:
        """The live OAuth connections `user_id` consented to, newest first.
        Only their own: the filter is on the consenting human, never on
        anything the caller names."""
        now = _now()
        rows = await OxydeHolderSession.objects.filter(
            holder_user_id=user_id, via=HolderVia.OAUTH, revoked_at__isnull=True,
            absolute_expires_at__gt=now,
        ).order_by("-created_at").all()
        # A session past its idle expiry cannot refresh, but an access
        # token issued before then may still work for its short lifetime,
        # so it is still listed (and revocable) until that has passed.
        grace = timedelta(seconds=get_settings().oauth_access_token_ttl_seconds)
        return [row for row in rows if row.idle_expires_at + grace > now]

    async def revoke_connection(self, user_id: str, holder_session_id: str) -> bool | None:
        """Revoke one of `user_id`'s own OAuth connections. None when it is
        not theirs (or not an OAuth connection, or does not exist): the
        caller answers 404 and says nothing about which. False when it was
        already revoked, True when this revoked it."""
        session = await OxydeHolderSession.objects.get_or_none(id=holder_session_id)
        if session is None or session.holder_user_id != user_id or session.via != HolderVia.OAUTH:
            return None
        return await self.tokens.revoke_session(session.id, actor_id=user_id, reason=REASON_USER_REVOKED)
