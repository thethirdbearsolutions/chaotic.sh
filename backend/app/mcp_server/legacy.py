"""In-band retirement notice for a shared MCP identity (CHT-1720, step 2).

Every session on the old shared connector authenticates as one agent with
one API key, so the server cannot tell those sessions apart or reach them
one by one. What it can do is tell each of them, in the conversation,
the next time it calls a tool. The keys are named by
``MCP_LEGACY_SHARED_KEY_IDS`` (``app.config``). When a /mcp request
(either route: the header or the capability URL) is authenticated with
one of them:

* the server's ``instructions`` carry the notice after the usual text,
  so a client that initializes now sees it (``LegacyNoticeMiddleware``,
  the SDK's public ``ServerMiddleware`` hook, which wraps ``initialize``
  and ``server/discover`` like every other request);
* every tool result, success or error envelope, carries it as a
  top-level ``notice`` string (``with_notice``), so a session that
  initialized long ago sees it on its next call.

Any other credential, and every request while the setting is empty (the
default), gets neither: the instructions and results are exactly what
they were. The tool schemas never change, since the notice is added to
the result, not declared in any signature, so the toolset fingerprint
and docs/mcp-toolset-schema.json are unaffected.

``notice`` is a reserved top-level result key on this transport: no tool
body and no response schema has one (``tests/test_mcp_legacy_notice.py``
checks both), and ``with_notice`` logs if a result ever does.
"""
from __future__ import annotations

import functools
import ipaddress
import logging
from datetime import date
from urllib.parse import urlsplit

from app.auth.credentials import CredentialKind
from app.config import get_settings
from app.mcp_server.context import current_mcp_principal

logger = logging.getLogger(__name__)

NOTICE_KEY = "notice"
# The requests whose result carries the server's instructions.
_INSTRUCTION_METHODS = frozenset({"initialize", "server/discover"})


def _oauth_reachable(settings) -> bool:
    """Can a chat client be told to add this server by URL and sign in
    with OAuth? Only when OAuth is on and the issuer is an https origin
    that is not this machine (a chat client runs elsewhere)."""
    if not settings.oauth_enabled:
        return False
    parts = urlsplit(settings.oauth_issuer)
    host = (parts.hostname or "").lower()
    if parts.scheme != "https" or not host or host == "localhost" or host.endswith(".localhost"):
        return False
    try:
        return not ipaddress.ip_address(host).is_loopback
    except ValueError:
        return True  # a host name


def notice_for(principal) -> str | None:
    """The retirement notice for ``principal``, or None when its
    credential is not a listed legacy key."""
    settings = get_settings()
    listed = settings.mcp_legacy_shared_key_id_set
    if not listed or principal is None:
        return None
    if principal.kind is not CredentialKind.API_KEY or principal.credential_id not in listed:
        return None
    retire = settings.mcp_legacy_retire_date
    if not retire:
        when = "is being retired soon (the date is not set yet)"
    elif date.fromisoformat(retire) < date.today():
        when = f"was due to be retired on {retire} and may stop working at any time"
    else:
        when = f"is being retired on {retire}"
    chat = (
        f"in a chat client such as claude.ai, add the server again by URL ({settings.oauth_issuer}/mcp) "
        "and sign in with OAuth"
        if _oauth_reachable(settings)
        else "in a chat client, ask your user to reconnect it with an identity of its own"
    )
    return (
        f'NOTICE: this connection uses the shared "{principal.user.name}" identity, which {when}; '
        "after that its key stops working. Switch to an identity of your own: in Claude Code, use the "
        "stdio server (`claude mcp add chaotic -- chaotic mcp`) with a registrar's key and "
        "`chaotic config set-session-identity auto`, which gives each session its own identity; "
        f"{chat}. Then, as the new identity, re-claim only the tickets you started in this "
        "conversation (`issue_update` with `assignee: \"me\"`, then `issue_start`). Other sessions "
        "share this identity, so if you cannot tell which tickets are yours, leave them all and tell "
        "your user."
    )


def current_notice() -> str | None:
    """The notice for the in-flight MCP request, or None (also outside
    any request, where there is no principal)."""
    try:
        principal = current_mcp_principal.get()
    except LookupError:
        return None
    return notice_for(principal)


def with_notice(tool):
    """Wrap a bound tool so its result carries the notice when the
    request's credential is a listed legacy key. ``functools.wraps``
    copies ``__signature__`` (set by ``registry.bind``), so the SDK
    derives exactly the same input schema as for ``tool``."""

    @functools.wraps(tool)
    async def noticed(*args, **kwargs):
        result = await tool(*args, **kwargs)
        notice = current_notice()
        if notice is None:
            return result
        if not isinstance(result, dict):
            logger.warning("%s returned %s, not an object: its legacy-key notice was dropped",
                           tool.__name__, type(result).__name__)
            return result
        if NOTICE_KEY in result:
            logger.error("%s returned its own %r field; the legacy-key notice replaces it",
                         tool.__name__, NOTICE_KEY)
        return {**result, NOTICE_KEY: notice}

    return noticed


class LegacyNoticeMiddleware:
    """``ServerMiddleware`` appending the notice to the instructions in
    the ``initialize`` and ``server/discover`` results. Both run inside
    the middleware chain and produce their wire dict there; the
    contextvar is the request's, so the notice is per request."""

    async def __call__(self, ctx, call_next):
        result = await call_next(ctx)
        if ctx.method not in _INSTRUCTION_METHODS:
            return result
        notice = current_notice()
        if notice is None:
            return result
        if not isinstance(result, dict):
            logger.warning("%s result is %s, not an object: its legacy-key notice was dropped",
                           ctx.method, type(result).__name__)
            return result
        base = result.get("instructions")
        return {**result, "instructions": f"{base}\n\n{notice}" if base else notice}
