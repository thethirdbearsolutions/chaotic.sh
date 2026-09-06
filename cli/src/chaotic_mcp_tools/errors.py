"""The one MCP error envelope (CHT-1350, ADR-0006) and the three exception
types a ``Backend`` adapter raises so the shared boundary can build it.

``{"error": {"message": str, "error_code"?: str, "http_status"?: int, ...}}``
-- ``message`` is always a human/agent readable sentence; everything else
is additive structure a caller can switch on without parsing prose.
Identical on both transports because it is built in exactly one place.
"""
from __future__ import annotations


class ToolInputError(Exception):
    """Bad input or missing context the caller can fix: an unknown issue
    type, no project selected, an ambiguous label name. Reported with
    ``error_code: tool_input``. Raised by tool bodies and by adapters'
    scope resolvers alike."""


class BackendError(Exception):
    """The data source refused or failed a request: a REST 4xx/5xx on the
    stdio side, an ``HTTPException`` or pydantic ``ValidationError`` in
    process. Adapters translate their native exception into this at
    their edge, preserving the server's structured ``detail`` (governance
    dicts with ``error_code``/``message``/``pending_rituals``; validation
    lists of ``{loc, msg}``; plain strings) and the status code.

    ``message`` may be None when the detail is a dict without its own
    ``message`` and the adapter has no human rendering of it; the payload
    builder supplies a sentence.
    """

    def __init__(self, message: str | None, http_status: int | None = None, detail=None):
        super().__init__(message or "")
        self.message = message
        self.http_status = http_status
        self.detail = detail


class TransportError(Exception):
    """The data source could not be reached at all (stdio side only:
    connection refused, timeout, protocol error). Carries the
    ``error_code`` the envelope should report -- the adapter decides the
    wording, since it knows the server URL."""

    def __init__(self, message: str, error_code: str):
        super().__init__(message)
        self.error_code = error_code


def error_envelope(message: str, error_code: str | None = None, **extra) -> dict:
    """Build ``{"error": {...}}``. ``extra`` is merged verbatim, like the
    detail-dict builders below."""
    payload = {"message": message}
    if error_code:
        payload["error_code"] = error_code
    payload.update(extra)
    return {"error": payload}


def validation_payload(errors: list) -> dict:
    """Inner dict for a validation failure: ``errors`` is loc/msg only
    (never the submitted value -- the REST 422 handler and the CLI's
    formatter are value-blind on purpose, so this is too), ``message`` is
    ``<field>: <msg>`` per line, and it reports the 422 a REST caller
    would have seen."""
    cleaned, lines = [], []
    for err in errors:
        if not isinstance(err, dict) or "msg" not in err:
            cleaned.append({"loc": [], "msg": str(err)})
            lines.append(str(err))
            continue
        loc = [str(part) for part in err.get("loc", [])]
        cleaned.append({"loc": loc, "msg": err["msg"]})
        field = ".".join(p for p in loc if p not in ("body", "query", "path", "header")) or ".".join(loc)
        lines.append(f"{field}: {err['msg']}" if field else str(err["msg"]))
    return {
        "message": "\n".join(lines) or "Validation error.",
        "error_code": "validation_error",
        "errors": cleaned,
        "http_status": 422,
    }


def backend_error_payload(e: BackendError) -> dict:
    """Turn a BackendError into the envelope's inner dict, keeping whatever
    structure the server sent. Governance errors carry their own
    ``message`` (tests/test_mcp_tools_direct pins that every structured
    HTTPException in app/api does), so both transports say the same
    thing; a dict without one falls back to the adapter's rendering, then
    to a generic sentence naming the code."""
    detail = e.detail
    if isinstance(detail, dict):
        payload = dict(detail)
        payload.setdefault(
            "message",
            e.message or f"Request failed ({payload.get('error_code') or f'HTTP {e.http_status}'}).",
        )
    elif isinstance(detail, list):
        payload = validation_payload(detail)
    else:
        payload = {"message": e.message if e.message is not None else str(detail)}
    if e.http_status is not None:
        payload.setdefault("http_status", e.http_status)
    return payload
