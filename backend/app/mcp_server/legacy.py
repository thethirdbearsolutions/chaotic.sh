"""In-band retirement notice for a shared MCP identity (CHT-1720, step 2).

Every session on the old shared connector authenticates as one agent with
one API key, so the server cannot tell those sessions apart or reach them
one by one. What it can do is tell each of them, in the conversation,
the next time it calls a tool. The keys are named by
``MCP_LEGACY_SHARED_KEY_IDS`` (``app.config``). When a /mcp request
(either route: the header or the capability URL) is authenticated with
one of them:

* the server's ``instructions`` carry the notice after the usual text,
  so a client that initializes now sees it (``install_instructions_notice``);
* every tool result, success or error envelope, carries it as a
  top-level ``notice`` string (``with_notice``), so a session that
  initialized long ago sees it on its next call.

Any other credential, and every request while the setting is empty (the
default), gets neither: the instructions and results are exactly what
they were. The tool schemas never change, since the notice is added to
the result, not declared in any signature, so the toolset fingerprint
and docs/mcp-toolset-schema.json are unaffected.

``notice`` is a reserved top-level result key on this transport: no tool
returns one of its own (``tests/test_mcp_legacy_notice.py`` checks).
"""
from __future__ import annotations

import functools

from app.auth.credentials import CredentialKind
from app.config import get_settings
from app.mcp_server.context import current_mcp_principal

NOTICE_KEY = "notice"


def notice_for(principal) -> str | None:
    """The retirement notice for ``principal``, or None when its
    credential is not a listed legacy key."""
    settings = get_settings()
    listed = settings.mcp_legacy_shared_key_id_set
    if not listed or principal is None:
        return None
    if principal.kind is not CredentialKind.API_KEY or principal.credential_id not in listed:
        return None
    when = (f"on {settings.mcp_legacy_retire_date}" if settings.mcp_legacy_retire_date
            else "soon (the date is not set yet)")
    return (
        f'NOTICE: this connection uses the shared "{principal.user.name}" identity, which is being '
        f"retired {when}. After that its key stops working. Switch to an identity of your own: "
        "in Claude Code, use the stdio server (`claude mcp add chaotic -- chaotic mcp`) with a "
        "registrar's key and `chaotic config set-session-identity auto`, which gives each session "
        "its own identity; in a chat client such as claude.ai, add the server again by URL "
        f"({settings.oauth_issuer}/mcp) and sign in with OAuth. Then, as the new identity, take over "
        "the tickets you have in progress: `issue_update` each one with `assignee: \"me\"`, then "
        "`issue_start` it, so none stay with the shared identity."
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
        if notice is not None and isinstance(result, dict):
            result = {**result, NOTICE_KEY: notice}
        return result

    return noticed


def _get_instructions(self):
    base = self.__dict__.get("instructions")
    notice = current_notice()
    if notice is None:
        return base
    return f"{base}\n\n{notice}" if base else notice


def _set_instructions(self, value):
    self.__dict__["instructions"] = value


# Read per request: initialize and server/discover both read the
# attribute at call time, so the notice appears only for a listed key.
_INSTRUCTIONS = property(_get_instructions, _set_instructions)


def install_instructions_notice(server) -> None:
    """Make ``server`` (an ``MCPServer``) append the notice to its
    instructions for a listed key. The SDK keeps instructions as a plain
    attribute of its private low-level server, set once at construction;
    this swaps that one instance's class for a direct subclass whose
    ``instructions`` is a property over the same stored value (a direct
    subclass with no slots keeps the instance layout, which a mixin base
    would not). Tested end to end over HTTP, so an SDK change that moves
    the attribute fails a test rather than silently dropping the notice."""
    low = server._lowlevel_server
    if getattr(type(low), "_chaotic_legacy_notice", False):
        return
    stored = low.__dict__.get("instructions")
    low.__class__ = type(
        f"{type(low).__name__}WithLegacyNotice", (type(low),),
        {"instructions": _INSTRUCTIONS, "_chaotic_legacy_notice": True},
    )
    low.instructions = stored
