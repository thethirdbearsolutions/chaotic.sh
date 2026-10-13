"""OAuth client rules that need no database (CHT-1518; design doc §2.2):
redirect-URI matching, what a dynamically registered redirect URI may
be, the RFC 8707 resource values this server answers to, and the
known-clients table.

Redirect matching (threat S3, invariant I17) is exact string comparison
against the client's registered URIs, with one exception from RFC 8252
§7.3: a loopback ``http`` redirect matches ignoring the port, because a
native client (Claude Code) listens on whatever port it got. The host
must still be the same loopback name: ``localhost`` and ``127.0.0.1``
are different registrations. Nothing else is normalised (no case
folding, no default-port elision, no trailing-slash games).
"""
from __future__ import annotations

import re
from dataclasses import dataclass
from urllib.parse import urlsplit

LOOPBACK_HOSTS = frozenset({"localhost", "127.0.0.1", "[::1]"})

# DCR limits (design §2.2).
DCR_MAX_REDIRECT_URIS = 5
DCR_MAX_REDIRECT_URI_LENGTH = 512
DCR_MAX_CLIENT_NAME = 64

# `http://<loopback>[:port]<rest>`; the port group is optional digits.
_LOOPBACK_RE = re.compile(r"^http://(localhost|127\.0\.0\.1|\[::1\])(?::(\d{1,5}))?(/[^#]*)?$")


def _loopback_parts(uri: str) -> tuple[str, str] | None:
    """(host, everything after the authority) for a loopback http URI with
    a valid or absent port, else None."""
    match = _LOOPBACK_RE.match(uri)
    if not match:
        return None
    port = match.group(2)
    if port is not None and not 0 < int(port) <= 65535:
        return None
    return match.group(1), match.group(3) or ""


def is_loopback_redirect(uri: str) -> bool:
    return _loopback_parts(uri) is not None


def redirect_uri_matches(registered: list[str] | tuple[str, ...], presented: str) -> bool:
    """Does ``presented`` match one of the client's ``registered`` redirect
    URIs? See the module docstring."""
    if not presented or "#" in presented:
        return False
    if presented in registered:
        return True
    loop = _loopback_parts(presented)
    if loop is None:
        return False
    return any(_loopback_parts(r) == loop for r in registered)


def dcr_redirect_uri_problem(uri: object) -> str | None:
    """Why ``uri`` may not be a dynamically registered redirect URI, or
    None if it may: ``https://`` with a host, or loopback ``http://``; no
    fragment, wildcard, userinfo, whitespace or control characters; at
    most DCR_MAX_REDIRECT_URI_LENGTH characters."""
    if not isinstance(uri, str) or not uri:
        return "redirect_uris must be non-empty strings"
    if len(uri) > DCR_MAX_REDIRECT_URI_LENGTH:
        return f"a redirect_uri may be at most {DCR_MAX_REDIRECT_URI_LENGTH} characters"
    if not uri.isascii() or any(c.isspace() or ord(c) < 0x20 or ord(c) == 0x7F for c in uri):
        return "a redirect_uri must be ASCII with no whitespace or control characters"
    if "#" in uri:
        return "a redirect_uri must not have a fragment"
    if "*" in uri:
        return "a redirect_uri must not contain wildcards"
    try:
        parts = urlsplit(uri)
        parts.port
    except ValueError:
        return "a redirect_uri must be a valid URL"
    if parts.username is not None or parts.password is not None:
        return "a redirect_uri must not carry credentials"
    if parts.scheme == "https" and parts.hostname:
        return None
    if parts.scheme == "http" and is_loopback_redirect(uri):
        return None
    return "a redirect_uri must be https, or http on a loopback host"


def redirect_host(uri: str) -> str:
    """What the consent page shows as where the code goes."""
    try:
        return urlsplit(uri).hostname or uri
    except ValueError:
        return uri


# --- RFC 8707 resource ---------------------------------------------------


def canonical_resource(value: str, issuer: str) -> str | None:
    """The resource ``value`` names on this server, or None if it names
    none. Both identifiers the discovery documents publish are accepted:
    ``<issuer>/mcp`` (the path-suffixed protected-resource document) and
    ``<issuer>`` (the root one, CHT-1564), each with or without one
    trailing slash, since pydantic-built clients send the bare origin as
    ``https://host/``. The answer is ``<issuer>/mcp`` either way: OAuth
    connector tokens are issued for /mcp and accepted only there (I16)."""
    trimmed = value[:-1] if value.endswith("/") else value
    if trimmed in (issuer, issuer + "/mcp"):
        return issuer + "/mcp"
    return None


# --- known clients -------------------------------------------------------


@dataclass(frozen=True)
class KnownClient:
    name: str
    # Exact CIMD client_ids, and CIMD hosts whose every document is this
    # vendor's. A CIMD client_id is proven by the TLS fetch from its host,
    # so recognising by host can't be spoofed by a third party.
    client_ids: frozenset[str] = frozenset()
    hosts: frozenset[str] = frozenset()


# Advisory only: a match puts a "recognized" badge on the consent page.
# It never skips consent (design §2.3). DCR clients are never recognized,
# whatever they call themselves or wherever they redirect.
KNOWN_CLIENTS: tuple[KnownClient, ...] = (
    KnownClient("Claude Code", client_ids=frozenset({"https://claude.ai/oauth/claude-code-client-metadata"})),
    KnownClient("Claude", hosts=frozenset({"claude.ai"})),
    KnownClient("ChatGPT", hosts=frozenset({"chatgpt.com", "openai.com"})),
)


def known_client_name(client_id: str) -> str | None:
    """The recognized name of a CIMD client_id, or None."""
    for known in KNOWN_CLIENTS:
        if client_id in known.client_ids:
            return known.name
    try:
        parts = urlsplit(client_id)
    except ValueError:
        return None
    if parts.scheme != "https" or not parts.hostname:
        return None
    for known in KNOWN_CLIENTS:
        if parts.hostname in known.hosts:
            return known.name
    return None
