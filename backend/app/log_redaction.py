"""Scrub credentials out of uvicorn's request log lines (CHT-1590, CHT-1597).

uvicorn writes the request target, path *and* query string, on two
loggers: every HTTP response on ``uvicorn.access`` (``'%s - "%s %s
HTTP/%s" %d'``, the 500s it sends itself included), and every WebSocket
handshake on ``uvicorn.error`` (``'%s - "WebSocket %s" [accepted]'``,
``403`` and so on). Both read the query from the ASGI scope, so a secret
in a URL lands in the log whatever the app does with it.

This is a ``logging.Filter`` on both loggers, not a scope rewrite: the app
always sees the real query (``/ws?token=<jwt>`` must still authenticate),
and the filter still covers responses sent outside every middleware. In a
logged request target it redacts

* the value of a credential parameter (``CREDENTIAL_PARAMS``, any case,
  percent-encoded names included), whatever the value looks like: this is
  what hides the login JWT the SPA sends as ``/ws?token=``;
* every secret this server mints, anywhere in the line, by its exact shape
  (a prefix from ``ALL_SECRET_PREFIXES`` plus ``SECRET_BYTES`` of hex, as
  ``mint_secret`` makes them): ``ck_...19a0``, the same short form the
  ``/mcp/<key>`` path scrub uses (``app.mcp_server.auth``);
* a query name or value that hides such a secret under percent-encoding,
  up to ``_MAX_DECODE`` layers deep (``cb=http%3A%2F%2Fx%2F%3Fkey%3Dck_...``).

The ``/mcp/<key>`` path is still rewritten in the scope by
``CapabilityPathRedaction``: that rewrite is functional (it is how the
route gets the key), and the path has no other consumer.

``install()`` puts the filter on both loggers. ``app.main`` calls it at
import and again at startup, so every way of serving ``app.main:app``
(``just serve``, ``just serve-prod``, ``python -m app.main``, the systemd
unit, the e2e server) gets it, after uvicorn's own ``dictConfig``, which
in any case keeps a logger's existing filters.
"""
from __future__ import annotations

import logging
import re
from urllib.parse import unquote_plus

from app.services.token_service import ALL_SECRET_PREFIXES, SECRET_BYTES

SECRET_PATTERN = re.compile(
    "(?:" + "|".join(re.escape(p) for p in ALL_SECRET_PREFIXES) + f")[0-9a-f]{{{2 * SECRET_BYTES}}}"
)

# Query parameters whose value is a credential whatever it looks like.
CREDENTIAL_PARAMS = frozenset({
    "token", "access_token", "refresh_token", "key", "api_key",
    "client_secret", "code", "code_verifier",
})

REDACTED = "[redacted]"
LOGGERS = ("uvicorn.access", "uvicorn.error")

# How many layers of percent-encoding to look through for a hidden secret.
_MAX_DECODE = 4


def _short(match: re.Match[str]) -> str:
    secret = match.group(0)
    prefix = next(p for p in ALL_SECRET_PREFIXES if secret.startswith(p))
    return f"{prefix}...{secret[-4:]}"


def redact_secrets(text: str) -> str:
    """Replace every minted secret in ``text`` with its short form."""
    return SECRET_PATTERN.sub(_short, text)


def _hides_secret(text: str) -> bool:
    """True if a percent-decoded layer of ``text`` holds a minted secret."""
    for _ in range(_MAX_DECODE):
        decoded = unquote_plus(text)
        if decoded == text:
            return False
        text = decoded
        if SECRET_PATTERN.search(text):
            return True
    return False


def _is_credential_name(name: str) -> bool:
    return unquote_plus(name).strip().lower() in CREDENTIAL_PARAMS


def redact_query(query: str) -> str:
    """Redact credentials in a raw query string; pairs split on ``&`` and
    ``;`` (the app ignores ``;``, the log does not), separators kept."""
    parts = re.split(r"([&;])", query)
    for i, part in enumerate(parts):
        if part in ("&", ";"):
            continue
        part = redact_secrets(part)
        name, eq, value = part.partition("=")
        if _hides_secret(name):
            part = REDACTED
        elif eq and (_is_credential_name(name) or _hides_secret(value)):
            part = f"{name}={REDACTED}"
        parts[i] = part
    return "".join(parts)


def redact_request_target(target: str) -> str:
    """Redact a logged request target (``/path?query``)."""
    path, question, query = target.partition("?")
    return redact_secrets(path) + (question + redact_query(query) if question else "")


class RequestLineRedactionFilter(logging.Filter):
    """Rewrites a record's arguments before it is formatted. A string
    argument starting with ``/`` is a request target; any other string
    (the client address, a method) only loses minted secrets."""

    def filter(self, record: logging.LogRecord) -> bool:
        if isinstance(record.args, tuple) and record.args:
            record.args = tuple(
                (redact_request_target(a) if a.startswith("/") else redact_secrets(a)) if isinstance(a, str) else a
                for a in record.args
            )
        elif isinstance(record.msg, str):
            record.msg = redact_secrets(record.msg)
        return True


_FILTER = RequestLineRedactionFilter()


def install() -> None:
    """Attach the filter to uvicorn's loggers; safe to call repeatedly."""
    for name in LOGGERS:
        logger = logging.getLogger(name)
        if not any(isinstance(f, RequestLineRedactionFilter) for f in logger.filters):
            logger.addFilter(_FILTER)
