"""Turn tool bodies into registrable MCP tools: ``bind`` closes a body over
a ``Backend``, applies the one error boundary, and shapes the signature
the SDK derives the JSON schema from.

Why a signature rewrite rather than two thin per-server shims: mcp's
``MCPServer.add_tool`` builds each tool's inputSchema from
``inspect.signature(fn)``, which honours a ``__signature__`` attribute
before it follows ``__wrapped__``. So one body declaring
``team: str | None = None`` can be registered with or without that
parameter depending on ``backend.capabilities.team_param`` -- the HTTP
server advertises it, the stdio server does not, and there is still
exactly one implementation (CHT-1374; verified against mcp 2.1.1).
"""
from __future__ import annotations

import functools
import inspect

from .backend import Backend
from .errors import (
    BackendError,
    ToolInputError,
    TransportError,
    backend_error_payload,
    error_envelope,
)
from .tools import ALL_TOOLS


async def call_guarded(tool, backend: Backend, *args, **kwargs) -> dict:
    """Run a tool body so it NEVER raises -- every failure mode comes back
    as the ADR-0006 envelope and the server keeps serving other calls.
    Adapters only ever raise the three ``errors.py`` types; anything else
    is a bug, reported (never swallowed silently, never a crash) with
    ``error_code: unexpected``."""
    try:
        return await tool(backend, *args, **kwargs)
    except ToolInputError as e:
        return error_envelope(str(e), "tool_input")
    except BackendError as e:
        return {"error": backend_error_payload(e)}
    except TransportError as e:
        return error_envelope(str(e), e.error_code)
    except Exception as e:  # noqa: BLE001 - last-resort, never crash the server
        return error_envelope(f"Unexpected error ({type(e).__name__}): {e}", "unexpected")


def _takes_team(tool) -> bool:
    return "team" in inspect.signature(tool).parameters


# The tools whose schema carries the HTTP-only `team` parameter when the
# backend advertises it. Derived from the bodies, so a new team-scoped
# tool is covered the day it lands.
TEAM_SCOPED_TOOLS = frozenset(t.__name__ for t in ALL_TOOLS if _takes_team(t))


def bind(tool, backend: Backend):
    """An ``async def`` with the body's name, docstring and parameters --
    minus ``backend`` (closed over) and, unless the backend advertises it,
    minus ``team`` -- that returns the body's result or an error envelope.
    ``functools.wraps`` keeps ``__wrapped__`` pointing at the body so
    introspection (and the toolset-sync guard's async-ness check) can see
    through to it.
    """
    caps = backend.capabilities
    # eval_str: the bodies use `from __future__ import annotations`, and the
    # SDK needs real types (Annotated[..., Field(...)]) to build a schema.
    sig = inspect.signature(tool, eval_str=True)
    params = [
        p for p in sig.parameters.values()
        if p.name != "backend" and (caps.team_param or p.name != "team")
    ]

    @functools.wraps(tool)
    async def bound(*args, **kwargs):
        if not caps.team_param:
            kwargs.pop("team", None)
        return await call_guarded(tool, backend, *args, **kwargs)

    bound.__signature__ = sig.replace(parameters=params)
    bound.__mcp_backend__ = backend
    return bound


def bind_all(backend: Backend, tools=ALL_TOOLS) -> list:
    return [bind(tool, backend) for tool in tools]
