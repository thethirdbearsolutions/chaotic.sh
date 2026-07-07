"""Per-request auth context for the remote MCP transport.

Streamable HTTP has no equivalent of the stdio server's single-process,
single-profile assumption -- many callers, many API keys, concurrent
requests. ``auth.py``'s ASGI wrapper resolves the caller's ``OxydeUser``
once per request and stashes it here; tool functions (``tools.py``) read
it back out. A ``contextvars.ContextVar`` is the right primitive: each
inbound HTTP request runs in its own asyncio Task (Starlette/uvicorn spawn
one per connection), and contextvars are copied into child tasks at
spawn time, so this stays correctly isolated per request even though the
MCP session manager fans work out across its own internal task group.
"""
from __future__ import annotations

import contextvars

from app.oxyde_models.user import OxydeUser as User

current_mcp_user: contextvars.ContextVar[User] = contextvars.ContextVar("current_mcp_user")


def get_current_mcp_user() -> User:
    """Return the authenticated user for the in-flight MCP request.

    Raises LookupError if called outside of a request that went through
    ``auth.py``'s wrapper -- that's a bug (the wrapper is the only thing
    that should ever be missing), not a client-facing auth failure, so
    tool code should let it propagate rather than swallow it.
    """
    return current_mcp_user.get()
