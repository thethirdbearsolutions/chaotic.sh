"""Revocation cascades (CHT-1523; design doc "MCP OAuth and token
service: design" §4.3, threats S7 and S12).

The schema cascades only *deletes*: a holder session or token goes when
its principal, holder, team, client or key row is deleted. Revoking a key
(``is_active`` false), deactivating or retiring an agent, or removing a
member from a team deletes nothing, so without this module every holder
session and unredeemed claim ticket those produced would live on, held
off only by the credential resolver's per-request checks. This module
ends them explicitly and records each action in ``revocation_events``
(see below).

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
  (``AgentService.release_member_agents``), as above;
* a principal or a human about to be deleted, and a team about to be
  deleted: the same, before the delete cascades the rows away, so the
  action is audited and the epoch moves.

Call these inside the transaction that makes the change they follow,
after that change's first write: the revocation event's ``seq`` is
assigned there (see ``OxydeRevocationEvent.seq``). Sessions are revoked
set-wise by ``TokenService.revoke_sessions_batch``, and each action
writes exactly one ``revocation_events`` row for its target with what it
revoked, so the epoch moves once per target, not once per session, and
summing ``cascade_counts`` over events never counts a session twice. The
event's team is the one team every revoked session was in, or NULL when
they span teams (or there were none). A rollback of the outer
transaction rolls all of it back with the change.

Not here yet (CHT-1449): the admin view, bulk revocation with dry-run,
and revoking an OAuth client or a grant.
"""
from __future__ import annotations

import json
from collections.abc import Iterable
from dataclasses import dataclass, field
from datetime import datetime, timedelta, timezone

from app.config import get_settings
from app.enums import HolderVia, RevocationTarget, TokenKind
from app.oxyde_models.api_key import OxydeAPIKey
from app.oxyde_models.oauth import OxydeAuthToken, OxydeHolderSession, OxydeRevocationEvent
from app.services.push_service import PushService
from app.services.token_service import TokenService, revocation_epoch

REASON_KEY_REVOKED = "key_revoked"
REASON_PRINCIPAL_DEACTIVATED = "principal_deactivated"
REASON_PRINCIPAL_DELETED = "principal_deleted"
REASON_MEMBER_REMOVED = "member_removed"
REASON_TEAM_DELETED = "team_deleted"
REASON_USER_REVOKED = "user_revoked"

# Single-use tokens that would start a new holder session if redeemed.
_STARTERS = (TokenKind.AUTH_CODE, TokenKind.CLAIM_TICKET)


@dataclass
class CascadeCounts:
    """What one cascade revoked."""

    holder_sessions: int = 0
    tokens: int = 0  # unredeemed authorization codes and claim tickets
    team_ids: set = field(default_factory=set)  # teams of the sessions revoked

    def __iadd__(self, other: "CascadeCounts") -> "CascadeCounts":
        self.holder_sessions += other.holder_sessions
        self.tokens += other.tokens
        self.team_ids |= other.team_ids
        return self

    @property
    def total(self) -> int:
        return self.holder_sessions + self.tokens

    @property
    def team_id(self) -> str | None:
        """The one team every revoked session was in, else None."""
        return next(iter(self.team_ids)) if len(self.team_ids) == 1 else None

    def as_json(self) -> str:
        return json.dumps({"holder_sessions": self.holder_sessions, "tokens": self.tokens})


def _now() -> datetime:
    return datetime.now(timezone.utc)


class RevocationService:
    """Explicit revocation cascades. See the module docstring."""

    def __init__(self, token_service: TokenService | None = None):
        self.tokens = token_service or TokenService()

    # --- primitives (no event; the public methods write one) -----------------

    async def _end(self, *, actor_id, reason, starters: dict | None = None, **session_filters) -> CascadeCounts:
        """Revoke the live sessions matching `session_filters` and the
        unredeemed, unexpired codes and tickets matching `starters`
        (a redeemed one is already its session's, and goes with it)."""
        counts = CascadeCounts()
        if session_filters:
            rows = await OxydeHolderSession.objects.filter(revoked_at__isnull=True, **session_filters).all()
            counts.holder_sessions, _tokens = await self.tokens.revoke_sessions_batch(
                [r.id for r in rows], actor_id=actor_id, reason=reason,
            )
            counts.team_ids = {r.team_id for r in rows}
        if starters:
            now = _now()
            counts.tokens = await OxydeAuthToken.objects.filter(
                kind__in=list(_STARTERS), used_at__isnull=True, revoked_at__isnull=True, expires_at__gt=now,
                **starters,
            ).update(revoked_at=now)
        return counts

    async def _end_keys(self, key_ids: list[str], *, actor_id, reason) -> CascadeCounts:
        if not key_ids:
            return CascadeCounts()
        # Devices registered with a revoked key stop being pushed to
        # (CHT-1604); the sessions' devices go in revoke_sessions_batch.
        await PushService().delete_for_keys(key_ids)
        return await self._end(
            actor_id=actor_id, reason=reason, credential_id__in=key_ids,
            starters={"minted_by_credential_id__in": key_ids},
        )

    async def _record(
        self, counts: CascadeCounts, *, target_type, target_id, actor_id, reason, team_id=None, filter=None,
    ) -> None:
        """The one event for an action, when it revoked anything."""
        if counts.total == 0:
            return
        await OxydeRevocationEvent.objects.create(
            seq=await revocation_epoch() + 1,
            team_id=team_id if team_id is not None else counts.team_id,
            actor_id=actor_id,
            target_type=target_type,
            target_id=target_id,
            filter=json.dumps(filter) if filter is not None else None,
            cascade_counts=counts.as_json(),
            reason=reason,
        )

    # --- cascades ------------------------------------------------------------

    async def revoke_for_keys(
        self, key_ids: Iterable[str], *, actor_id: str | None, reason: str = REASON_KEY_REVOKED,
    ) -> CascadeCounts:
        """Keys that were just revoked: end the sessions opened with them
        and the unredeemed tickets they minted. One API_KEY event per key."""
        total = CascadeCounts()
        for key_id in dict.fromkeys(key_ids):
            counts = await self._end_keys([key_id], actor_id=actor_id, reason=reason)
            await self._record(
                counts, target_type=RevocationTarget.API_KEY, target_id=key_id, actor_id=actor_id, reason=reason,
            )
            total += counts
        return total

    async def revoke_for_principals(
        self, user_ids: Iterable[str], *, actor_id: str | None, reason: str = REASON_PRINCIPAL_DEACTIVATED,
        as_holder: bool = False,
    ) -> CascadeCounts:
        """Principals that were just deactivated or retired (or are about
        to be deleted): end every session acting as them, every unredeemed
        code or ticket that would start one, and what every key that signs
        in as them opened or minted. With `as_holder`, also everything they
        answer for (a human about to be deleted). One IDENTITY event per
        principal."""
        total = CascadeCounts()
        for user_id in dict.fromkeys(user_ids):
            counts = await self._end(
                actor_id=actor_id, reason=reason, principal_user_id=user_id,
                starters={"principal_user_id": user_id},
            )
            if as_holder:
                counts += await self._end(
                    actor_id=actor_id, reason=reason, holder_user_id=user_id,
                    starters={"holder_user_id": user_id},
                )
            keys = await OxydeAPIKey.objects.filter(principal_user_id=user_id).all()
            counts += await self._end_keys([k.id for k in keys], actor_id=actor_id, reason=reason)
            await self._record(
                counts, target_type=RevocationTarget.IDENTITY, target_id=user_id, actor_id=actor_id, reason=reason,
            )
            total += counts
        return total

    async def revoke_for_member(
        self, team_id: str, user_id: str, *, revoked_key_ids: Iterable[str] = (), actor_id: str | None,
    ) -> CascadeCounts:
        """`user_id` was just removed from `team_id` (or left it): end the
        sessions they answer for in that team, the codes and tickets they
        would answer for there, and what the keys the removal revoked had
        opened or minted (design §4.3, S12). One MEMBER event, for all of
        it."""
        reason = REASON_MEMBER_REMOVED
        counts = await self._end(
            actor_id=actor_id, reason=reason, team_id=team_id, holder_user_id=user_id,
            starters={"team_id": team_id, "holder_user_id": user_id},
        )
        counts += await self._end_keys(list(dict.fromkeys(revoked_key_ids)), actor_id=actor_id, reason=reason)
        await self._record(
            counts, target_type=RevocationTarget.MEMBER, target_id=user_id, team_id=team_id,
            actor_id=actor_id, reason=reason,
        )
        return counts

    async def revoke_for_team(self, team_id: str, *, actor_id: str | None) -> CascadeCounts:
        """A team about to be deleted: end every session and unredeemed
        code or ticket in it. The delete would cascade them away; this
        writes the audit row and moves the epoch first. One BULK event
        whose filter names the team (its `team_id` is SET NULL with it)."""
        reason = REASON_TEAM_DELETED
        counts = await self._end(actor_id=actor_id, reason=reason, team_id=team_id, starters={"team_id": team_id})
        await self._record(
            counts, target_type=RevocationTarget.BULK, target_id=None, team_id=team_id,
            actor_id=actor_id, reason=reason, filter={"team_id": team_id},
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
