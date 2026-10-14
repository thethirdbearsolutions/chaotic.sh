"""What happens after a credential ends (CHT-1625).

Revoking a key, revoking a holder session, deactivating or deleting a
principal, removing a member from a team and deleting a team all end
credentials. State that depends on a credential (a push device
registered with it, CHT-1604; a ``/ws`` socket authenticated with it,
CHT-1616) must end with it. Rather than each revoking path calling each
dependent by hand, the revoking code reports one ``CredentialsEnded``
event and every dependent is a hook that reacts to it.

Hooks run **after the transaction that ended the credentials commits**.
Every primitive that ends a credential (``TokenService._revoke_session_in_tx``
and ``revoke_sessions_batch``, every ``RevocationService`` cascade) must run
inside ``revoking()``, which wraps ``atomic()``, and raises ``RuntimeError``
otherwise, on entry (``require_revoking``), whether or not it then ends
anything. So a path that would skip the report fails at once instead of
silently (PR #356 review, 1). ``revoking()`` holds the events reported in
it and dispatches them once its outermost transaction has committed;
they are dropped if it rolls back. The waiting is
``app.db.transactions.on_commit_collect`` (CHT-1605): ``revoking()``
is that module's ``atomic()``, so it may also be opened inside another
``atomic()``, and its events then wait for that one's commit. A nested
``revoking()`` joins the outer one; one that exits with an exception
(its savepoint rolled back) drops what it held. Everything ended in one
transaction is dispatched together, once. Opening ``revoking()`` inside
Oxyde's own ``atomic()`` raises: that transaction has no on-commit
callbacks, so the hooks could only fire before the commit or never. The
block belongs to the task that opened it: a child task (which inherits
ContextVars, but not Oxyde's transaction) is outside it.

Each hook runs on its own, bounded by ``HOOK_TIMEOUT_SECONDS``: one that
raises or times out is logged and the others still run, and nothing a
hook does can undo or fail the revocation, which has already committed.
The revoking request does wait for its hooks (the socket hook first: it
is in memory). Hooks are in-process: a revocation made by another
process (a second worker, a script against the database) does not reach
this one's sockets; the periodic ``/ws`` re-check
(``app.ws_auth.watch``) is the backstop for that. A process that died
between the commit and its hooks leaves push devices behind until the
next start (``PushService.delete_stale_bindings``); a hook that fails at
runtime leaves them until then too (the sender's side is CHT-1627).

The dependents are listed in ``_builtin_hooks``; a new one is a function
taking a ``CredentialsEnded``, added there.
"""
from __future__ import annotations

import asyncio
import logging
from collections.abc import Awaitable, Callable, Iterable
from contextlib import asynccontextmanager
from contextvars import ContextVar
from dataclasses import dataclass, field

from oxyde.db.transaction import get_active_transaction

from app.db import transactions
from app.db.transactions import atomic, on_commit_collect

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

# How long one hook may take on one event before it is abandoned (and
# logged): the revoking request waits for its hooks (PR #356 review, 3).
HOOK_TIMEOUT_SECONDS = 5.0

# Extra hooks (tests); the dependents themselves are in _builtin_hooks.
_extra_hooks: list[Hook] = []


@dataclass
class _Held:
    """The events held by one revoking() block, and the task that owns
    it. A ContextVar is copied into child tasks; the task check keeps a
    child from appending to a list its parent may already have
    dispatched (PR #356 review, 5)."""

    task: asyncio.Task | None
    events: list[CredentialsEnded] = field(default_factory=list)


_pending: ContextVar[_Held | None] = ContextVar("credentials_ended_pending", default=None)

# Moves each time a dispatch starts, i.e. after a revocation committed.
# /ws reads it around its handshake: a socket authenticated before a
# revocation committed but registered after its hooks ran is re-checked
# (PR #356 review, 2).
_generation = 0


def generation() -> int:
    """The number of dispatches started in this process."""
    return _generation


def _builtin_hooks() -> list[Hook]:
    """Every dependent of a credential. Imported here, not registered at
    import time, so a hook can never be missing because nothing happened
    to import its module first. The socket hook goes first: it is in
    memory and cannot block, where the push hook writes."""
    from app.services.push_service import on_credentials_ended as push_devices
    from app.websocket import on_credentials_ended as realtime_sockets

    return [realtime_sockets, push_devices]


def register(hook: Hook) -> Callable[[], None]:
    """Add a hook; returns a function that removes it."""
    _extra_hooks.append(hook)
    return lambda: _extra_hooks.remove(hook)


async def dispatch(events: Iterable[CredentialsEnded]) -> None:
    """Run every hook on every event, each on its own and each bounded by
    ``HOOK_TIMEOUT_SECONDS`` (module docstring). Never raises (except
    the caller's own cancellation)."""
    global _generation

    events = [e for e in events if e]
    if not events:
        return
    _generation += 1
    try:
        hooks = _builtin_hooks() + list(_extra_hooks)
    except Exception:  # pragma: no cover -- an import error in a hook module
        logger.exception("could not load the credential-ended hooks")
        return
    for event in events:
        for hook in hooks:
            name = getattr(hook, "__qualname__", hook)
            try:
                await asyncio.wait_for(hook(event), HOOK_TIMEOUT_SECONDS)
            except asyncio.TimeoutError:
                logger.error(
                    "credential-ended hook %s timed out after %ss (reason=%s)",
                    name, HOOK_TIMEOUT_SECONDS, event.reason,
                )
            except Exception:
                logger.exception("credential-ended hook %s failed (reason=%s)", name, event.reason)


def _held() -> _Held | None:
    """This task's revoking() block, if it is in one."""
    held = _pending.get()
    if held is not None and held.task is asyncio.current_task():
        return held
    return None


def require_revoking() -> None:
    """Raise unless this task is inside ``revoking()``. Every primitive
    that ends a credential calls it on entry, so a caller that would
    skip the report fails at once, whether or not it ends anything."""
    if _held() is None:
        raise RuntimeError(
            "credentials can only be ended inside "
            "app.services.credential_events.revoking() (CHT-1625)"
        )


async def ended(event: CredentialsEnded) -> None:
    """Report credentials that ended. Call after the write that ended
    them, inside ``revoking()`` (else ``RuntimeError``): the event waits
    for the commit."""
    require_revoking()
    _held().events.append(event)


@asynccontextmanager
async def revoking():
    """``atomic()`` for a transaction that may end credentials: the hooks
    for what it ended run after the outermost transaction commits
    (module docstring)."""
    if _held() is None and not transactions.active() and get_active_transaction() is not None:
        raise RuntimeError(
            "revoking() inside oxyde's plain atomic(): the hooks could not wait for "
            "its commit; open the outer transaction with app.db.transactions.atomic() (CHT-1625)"
        )
    held = _Held(task=asyncio.current_task())
    token = _pending.set(held)
    try:
        async with atomic():
            try:
                yield
            finally:
                _pending.reset(token)
                token = None
            # The block succeeded: what it ended waits for the outermost
            # commit, and is dropped if that (or a savepoint around this
            # block) rolls back.
            for event in held.events:
                await on_commit_collect("credential_events", event, dispatch)
    finally:
        if token is not None:  # pragma: no cover -- atomic() failed to open
            _pending.reset(token)
