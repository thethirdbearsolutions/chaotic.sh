"""chaotic_mcp_tools -- the one MCP tool surface, written once (CHT-1374).

Both chaotic MCP servers register the tools defined here:

* ``chaotic mcp`` (cli/src/cli/mcp_server.py, stdio) binds them to a
  ``RestBackend`` that calls the REST API through ``cli.client.Client``
  and takes team/project context from the local CLI profile.
* the backend's ``/mcp`` Streamable HTTP endpoint
  (backend/app/mcp_server/tools.py) binds them to an ``InProcessBackend``
  that calls ``app.api`` functions directly and takes context from the
  caller's API key.

The tool bodies (``tools/``) know nothing about either: each is an
``async def tool(backend: Backend, ...params)`` over the ``Backend``
Protocol (``backend.py``), which returns wire-form JSON (dicts/lists with
enums as their ``.value``) whichever adapter implements it. ``registry.bind``
turns a body into what ``MCPServer.add_tool`` wants -- the ``backend``
parameter closed over, the shared error boundary applied, and the
HTTP-only ``team`` parameter present or absent per the backend's
``Capabilities`` -- so the 18 ``team``-taking tools are ONE body plus a
flag, not two copies.

This package ships inside the ``chaotic-cli`` distribution (see
docs/adr/0007-one-mcp-tool-body-two-backends.md for why not a third
PyPI package) but imports nothing from ``cli`` or ``app``; a guard test
pins that. Its only dependency is pydantic (the ``Field`` metadata on
tool parameters).
"""
from __future__ import annotations

from .backend import Backend, Capabilities
from .constants import ISSUE_TYPE_ALIASES, ISSUE_TYPES
from .errors import (
    BackendError,
    ToolInputError,
    TransportError,
    backend_error_payload,
    error_envelope,
    validation_payload,
)
from .registry import TEAM_SCOPED_TOOLS, bind, bind_all, call_guarded
from .shapes import (
    COMPACT_DOCUMENT_FIELDS,
    COMPACT_ISSUE_FIELDS,
    COMPACT_PROJECT_FIELDS,
    ISSUE_VIEW_COMMENT_CAP,
    ISSUE_VIEW_FETCH_LIMIT,
    OFFSET_PROBE_SORT_KEYS,
    RESPONSE_SHAPES,
    TEXT_PREVIEW_CHARS,
    compact,
    listing,
    preview,
    with_budget_state,
)
from .tools import ALL_TOOLS

__all__ = [
    "ALL_TOOLS",
    "Backend",
    "BackendError",
    "COMPACT_DOCUMENT_FIELDS",
    "COMPACT_ISSUE_FIELDS",
    "COMPACT_PROJECT_FIELDS",
    "Capabilities",
    "ISSUE_TYPES",
    "ISSUE_TYPE_ALIASES",
    "ISSUE_VIEW_COMMENT_CAP",
    "ISSUE_VIEW_FETCH_LIMIT",
    "OFFSET_PROBE_SORT_KEYS",
    "RESPONSE_SHAPES",
    "TEAM_SCOPED_TOOLS",
    "TEXT_PREVIEW_CHARS",
    "ToolInputError",
    "TransportError",
    "backend_error_payload",
    "bind",
    "bind_all",
    "call_guarded",
    "compact",
    "error_envelope",
    "listing",
    "preview",
    "validation_payload",
    "with_budget_state",
]
