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
exactly one implementation (CHT-1374; verified against mcp 2.1.1, and 2.3.0 for CHT-1951).
"""
from __future__ import annotations

import dataclasses
import difflib
import functools
import inspect
import json

from .backend import Backend
from .errors import (
    BackendError,
    ToolInputError,
    TransportError,
    backend_error_payload,
    error_envelope,
)
from .tools import ALL_TOOLS


def add_tools(mcp, tools) -> None:
    """Register `tools` on `mcp`, each described by its docstring
    cleandoc'd (CHT-1699). `add_tool` would otherwise send the raw
    `__doc__`, which keeps its source indentation before Python 3.13 and
    loses it from 3.13 on, so clients saw different text depending on
    the server's interpreter, and paid tokens for the indentation.

    Also installs the unknown-argument guard (CHT-1951) on the server's
    public middleware chain. A server without one cannot have the guard,
    and is refused here, at startup, rather than quietly serving tools
    that drop what they do not recognise."""
    chain = getattr(mcp, "middleware", None)
    if not isinstance(chain, list):
        raise RuntimeError(
            "This MCP SDK's server has no middleware chain (MCPServer.middleware), so chaotic's "
            "tools cannot refuse unknown arguments; refusing to start. Install a newer mcp 2.x."
        )
    guard = next((m for m in chain if isinstance(m, UnknownArgumentGuard)), None)
    if guard is None:
        guard = UnknownArgumentGuard()
        chain.append(guard)
    for tool in tools:
        mcp.add_tool(tool, description=inspect.cleandoc(tool.__doc__ or ""))
        guard.accepted[tool.__name__] = tuple(inspect.signature(tool).parameters)


# Arguments every tool takes without complaint, whether or not it declares
# them. Agents pass these on every call "to be safe", the HTTP server's
# instructions say to pass them to disambiguate, and the stdio server
# always ignored `team`. Where a tool does not declare one, it is dropped:
# a scope hint that the call's own arguments (an identifier, an id)
# already settle. Anything else undeclared is refused.
SCOPE_HINTS = frozenset({"team", "project"})


def unknown_arguments_message(tool_name: str, unknown: list[str], accepted: list[str]) -> str:
    """The refusal for arguments a tool does not take: each one named,
    with the closest accepted name when there is one, then the full list."""
    parts = []
    for name in unknown:
        close = difflib.get_close_matches(name, accepted, n=1)
        parts.append(f"'{name}'" + (f" (did you mean '{close[0]}'?)" if close else ""))
    noun = "argument" if len(unknown) == 1 else "arguments"
    return (
        f"{tool_name} does not take the {noun} {', '.join(parts)}; nothing was done. "
        f"It accepts: {', '.join(accepted)}."
    )


def tool_result(payload: dict) -> dict:
    """A tools/call result on the wire carrying `payload`, the way the SDK
    sends an object a tool returned: one text block of indented JSON."""
    return {
        "content": [{"type": "text", "text": json.dumps(payload, indent=2, ensure_ascii=False)}],
        "isError": False,
    }


class UnknownArgumentGuard:
    """``ServerMiddleware`` (the SDK's public hook) that refuses a
    tools/call naming an argument the tool does not take (CHT-1951).

    The SDK's argument model ignores undeclared keys, so before this an
    `issue_create(assignee=...)` made an unassigned issue and said
    nothing. The refusal is the usual ``{"error": ...}`` result (ADR-0006,
    ``error_code: unknown_argument``), sent before the tool runs, so
    nothing is done. `SCOPE_HINTS` are let through, and dropped where the
    tool does not declare them. A call to a tool it was not told about
    passes through untouched."""

    def __init__(self):
        self.accepted: dict[str, tuple[str, ...]] = {}

    async def __call__(self, ctx, call_next):
        params = ctx.params
        if ctx.method == "tools/call" and isinstance(params, dict):
            name, arguments = params.get("name"), params.get("arguments")
            accepted = self.accepted.get(name) if isinstance(name, str) else None
            if accepted is not None and isinstance(arguments, dict):
                extra = [k for k in arguments if k not in accepted]
                unknown = sorted(k for k in extra if k not in SCOPE_HINTS)
                if unknown:
                    return tool_result(error_envelope(
                        unknown_arguments_message(name, unknown, sorted(accepted)), "unknown_argument",
                        unknown_arguments=unknown, accepted_arguments=sorted(accepted),
                    ))
                if extra:
                    kept = {k: v for k, v in arguments.items() if k in accepted}
                    ctx = dataclasses.replace(ctx, params={**params, "arguments": kept})
        return await call_next(ctx)


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
