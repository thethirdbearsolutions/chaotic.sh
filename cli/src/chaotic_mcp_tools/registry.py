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

import difflib
import functools
import inspect
import logging

from pydantic import ConfigDict, model_validator

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
    the server's interpreter, and paid tokens for the indentation."""
    for tool in tools:
        mcp.add_tool(tool, description=inspect.cleandoc(tool.__doc__ or ""))
        _forbid_unknown_arguments(mcp, tool.__name__)


logger = logging.getLogger(__name__)


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


def _strict_arg_model(tool_name: str, arg_model: type) -> type:
    """A subclass of the SDK's argument model that refuses arguments it has
    no field for, instead of pydantic's default of dropping them (CHT-1951).
    A dropped argument is a call the caller believes did something it did
    not: `issue_create(assignee=...)` created unassigned tickets."""
    accepted = sorted(f.alias or name for name, f in arg_model.model_fields.items())
    accepted_set = frozenset(accepted)

    @model_validator(mode="before")
    @classmethod
    def _refuse_unknown(cls, data):
        if isinstance(data, dict):
            unknown = sorted(k for k in data if k not in accepted_set)
            if unknown:
                raise ValueError(unknown_arguments_message(tool_name, unknown, accepted))
        return data

    return type(arg_model.__name__, (arg_model,), {
        "__module__": arg_model.__module__,
        "model_config": ConfigDict(extra="forbid"),
        "_refuse_unknown": _refuse_unknown,
    })


def _forbid_unknown_arguments(mcp, name: str) -> None:
    """Make the registered tool `name` refuse unknown arguments, and say so
    in its inputSchema (`additionalProperties: false`). The SDK has no
    public switch for this (its argument model ignores extras), so this
    reaches the registered Tool through the server's tool manager. If a
    future SDK moves that, the server still starts, with the old
    behaviour and a logged warning; the tests that pin the refusal fail."""
    manager = getattr(mcp, "_tool_manager", None)
    registered = manager.get_tool(name) if manager is not None else None
    metadata = getattr(registered, "fn_metadata", None)
    if metadata is None or not hasattr(metadata, "arg_model"):
        logger.warning("MCP tool %s: could not make it refuse unknown arguments (SDK internals moved)", name)
        return
    metadata.arg_model = _strict_arg_model(name, metadata.arg_model)
    registered.parameters = {**registered.parameters, "additionalProperties": False}


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
