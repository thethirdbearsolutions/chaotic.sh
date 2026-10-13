"""What happens after a credential ends (CHT-1625).

Revoking a key, revoking a holder session, deactivating or deleting a
principal, removing a member from a team and deleting a team all end
credentials. State that depends on a credential (a push device
registered with it, CHT-1604; a ``/ws`` socket authenticated with it,
CHT-1616) must end with it. Rather than each revoking path calling each
dependent by hand, the revoking code reports one ``CredentialsEnded``
event and every dependent is a hook that reacts to it.

Hooks run **after the transaction that ended the credentials commits**:

* a revocation made outside any transaction (``TokenService.revoke_session``
  and ``revoke_sessions_batch`` open their own) dispatches its event as
  soon as that transaction has committed;
* a revocation made inside a transaction must be inside ``revoking()``,
  which wraps ``atomic()``: events reported in it are held and
  dispatched once its outermost transaction has committed, and dropped
  if it rolls back. Reporting an event inside a transaction that is not
  ``revoking()`` raises ``RuntimeError``: firing then would act on state
  that might never commit, and firing later is impossible because Oxyde
  has no on-commit callback. A nested ``revoking()`` joins the outer
  one; one that exits with an exception (its savepoint rolled back)
  drops what it held.

Each hook runs on its own: one that raises is logged and the others
still run, and nothing a hook does can undo or fail the revocation,
which has already committed. Hooks are in-process: a revocation made by
another process (a second worker, ``chaotic`` admin commands run on the
server) does not reach this one's sockets; the periodic ``/ws``
re-check (``app.ws_auth.watch``) is the backstop for that, and
``PushService.delete_stale_bindings`` (run at startup) for a process
that died between the commit and its hooks.

The dependents are listed in ``_builtin_hooks``; a new one is a function
taking a ``CredentialsEnded``, added there.
"""
from __future__ import annotations

import logging
from collections.abc import Awaitable, Callable, Iterable
from contextlib import asynccontextmanager
from contextvars import ContextVar
from dataclasses import dataclass

from oxyde import atomic
from oxyde.db.transaction import get_active_transaction

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class CredentialsEnded:
    """Credentials that just ended, and why. Every field is "these ended";
    a hook acts on the fields it cares about and ignores the rest."""

    reason: str
    # API keys revoked (``api_keys.id``).
    key_ids: frozenset[str] = frozenset()
    # Holder sessions revoked (``holder_sessions.id``).
    holder_session_ids: frozenset[str] = frozenset()
    # Principals deactivated, retired or about to be deleted: every
    # credential acting as them ended.
    user_ids: frozenset[str] = frozenset()
    # Humans about to be deleted: everything they answer for ended too.
    holder_user_ids: frozenset[str] = frozenset()
    # (team_id, user_id): a member removed from (or who left) a team.
    removed_member: tuple[str, str] | None = None
    # A team about to be deleted.
    deleted_team_id: str | None = None

    @classmethod
    def of(cls, reason: str, **fields) -> "CredentialsEnded":
        """Build one, turning iterables of ids into frozensets."""
        for name in ("key_ids", "holder_session_ids", "user_ids", "holder_user_ids"):
            if name in fields:
                fields[name] = frozenset(fields[name])
        return cls(reason=reason, **fields)

    def __bool__(self) -> bool:
        return bool(
            self.key_ids or self.holder_session_ids or self.user_ids or self.holder_user_ids
            or self.removed_member or self.deleted_team_id
        )


Hook = Callable[[CredentialsEnded], Awaitable[None]]

# Extra hooks (tests); the dependents themselves are in _builtin_hooks.
_extra_hooks: list[Hook] = []

# The events held by the innermost revoking() in this context, or None.
_pending: ContextVar[list[CredentialsEnded] | None] = ContextVar("credentials_ended_pending", default=None)


def _builtin_hooks() -> list[Hook]:
    """Every dependent of a credential. Imported here, not registered at
    import time, so a hook can never be missing because nothing happened
    to import its module first."""
    from app.services.push_service import on_credentials_ended as push_devices
    from app.websocket import on_credentials_ended as realtime_sockets

    return [push_devices, realtime_sockets]


def register(hook: Hook) -> Callable[[], None]:
    """Add a hook; returns a function that removes it."""
    _extra_hooks.append(hook)
    return lambda: _extra_hooks.remove(hook)


async def dispatch(events: Iterable[CredentialsEnded]) -> None:
    """Run every hook on every event, each on its own (module docstring).
    Never raises."""
    events = [e for e in events if e]
    if not events:
        return
    try:
        hooks = _builtin_hooks() + list(_extra_hooks)
    except Exception:  # pragma: no cover -- an import error in a hook module
        logger.exception("could not load the credential-ended hooks")
        return
    for event in events:
        for hook in hooks:
            try:
                await hook(event)
            except Exception:
                logger.exception(
                    "credential-ended hook %s failed (reason=%s)", getattr(hook, "__qualname__", hook), event.reason,
                )


async def ended(event: CredentialsEnded) -> None:
    """Report credentials that ended. Call after the write that ended
    them: inside ``revoking()`` the event waits for the commit; outside
    any transaction (the write has committed) it is dispatched now."""
    pending = _pending.get()
    if pending is not None:
        pending.append(event)
        return
    if get_active_transaction() is not None:
        raise RuntimeError(
            "credentials ended inside a transaction that is not revoking(): "
            "open it with app.services.credential_events.revoking() (CHT-1625)"
        )
    await dispatch([event])


@asynccontextmanager
async def revoking():
    """``atomic()`` for a transaction that may end credentials: the hooks
    for what it ended run after it commits (module docstring)."""
    outer = _pending.get()
    if outer is None and get_active_transaction() is not None:
        raise RuntimeError(
            "revoking() inside a plain atomic(): the hooks could not wait for "
            "its commit; open the outer transaction with revoking() (CHT-1625)"
        )
    held: list[CredentialsEnded] = []
    token = _pending.set(held)
    try:
        async with atomic():
            yield
    finally:
        _pending.reset(token)
    # Reached only when the block (and its atomic) exited cleanly.
    if outer is not None:
        outer.extend(held)
    else:
        await dispatch(held)
