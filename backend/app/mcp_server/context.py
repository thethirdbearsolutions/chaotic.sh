"""Per-request auth context for the remote MCP transport.

Streamable HTTP has no equivalent of the stdio server's single-process,
single-profile assumption -- many callers, many API keys, concurrent
requests. ``auth.py``'s ASGI wrapper resolves the caller's ``OxydeUser``
once per request and stashes it here; the ``InProcessBackend`` adapter
(``backend.py``) reads it back out on every call. A ``contextvars.ContextVar`` is the right primitive: each
inbound HTTP request runs in its own asyncio Task (Starlette/uvicorn spawn
one per connection), and contextvars are copied into child tasks at
spawn time, so this stays correctly isolated per request even though the
MCP session manager fans work out across its own internal task group.
"""
from __future__ import annotations

import contextlib
import contextvars
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.auth.credentials import Principal
    from app.oxyde_models.user import OxydeUser as User

# The whole Principal, not just its user: the user and the scopes it was
# granted travel together, so nothing can set one without the other
# (CHT-1562).
current_mcp_principal: contextvars.ContextVar[Principal] = contextvars.ContextVar("current_mcp_principal")


def get_current_mcp_principal() -> Principal:
    """Return the resolved principal for the in-flight MCP request.

    Raises LookupError if called outside of a request that went through
    ``auth.py``'s wrapper -- that's a bug (the wrapper is the only thing
    that should ever be missing), not a client-facing auth failure, so
    tool code should let it propagate rather than swallow it.
    """
    return current_mcp_principal.get()


def get_current_mcp_user() -> User:
    """The user the in-flight MCP request acts as (see above)."""
    return current_mcp_principal.get().user


def api_key_principal(user: User) -> Principal:
    """``user`` as an API key's principal (every scope), the way a ``ck_``
    key resolves. For tests and in-process callers that do not come
    through ``auth.py``. ``holder_user_id`` is ``user`` itself, which is
    right for a human's key and not for an agent's (whose holder is a
    human); nothing on the MCP path reads it today."""
    from app.auth.credentials import CredentialKind, Principal

    return Principal(user=user, holder_user_id=user.id, kind=CredentialKind.API_KEY)


@contextlib.contextmanager
def acting_as(who):
    """Bind ``who`` (a ``Principal``, or a user via ``api_key_principal``)
    for the duration of the block."""
    from app.auth.credentials import Principal

    principal = who if isinstance(who, Principal) else api_key_principal(who)
    token = current_mcp_principal.set(principal)
    try:
        yield principal
    finally:
        current_mcp_principal.reset(token)
