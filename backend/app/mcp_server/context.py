"""Per-request auth context for the remote MCP transport.

Streamable HTTP has no equivalent of the stdio server's single-process,
single-profile assumption -- many callers, many API keys, concurrent
requests. ``auth.py``'s ASGI wrapper resolves the caller once per request
into the shared ``ActorContext`` (``app.actor``, CHT-1432; before that this
module had its own User-only ContextVar); the ``InProcessBackend`` adapter
(``backend.py``) reads the user back out on every call. A ContextVar is the
right primitive: each inbound HTTP request runs in its own asyncio Task
(Starlette/uvicorn spawn one per connection), and contextvars are copied
into child tasks at spawn time, so this stays correctly isolated per request
even though the MCP session manager fans work out across its own internal
task group.
"""
from __future__ import annotations

from app.actor import get_current_actor
from app.oxyde_models.user import OxydeUser as User


def get_current_mcp_user() -> User:
    """Return the acting user of the in-flight MCP request.

    Raises LookupError if called outside of a request that went through
    ``auth.py``'s wrapper -- that's a bug (the wrapper is the only thing
    that should ever be missing), not a client-facing auth failure, so
    tool code should let it propagate rather than swallow it.
    """
    return get_current_actor().effective
