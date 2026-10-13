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
