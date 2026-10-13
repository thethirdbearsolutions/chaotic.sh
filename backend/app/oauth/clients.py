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

import ipaddress
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


# Schemes that run code or read local content wherever a browser is told
# to navigate to them. None of them has a period, so the private-use rule
# below already excludes them; listed so that stays true by intent.
_DANGEROUS_SCHEMES = frozenset({"javascript", "data", "vbscript", "file", "blob", "about", "filesystem"})
# RFC 8252 §7.1: a native app's private-use scheme is a reverse domain
# name it controls, so it has at least one period. Lower case only.
_PRIVATE_USE_SCHEME_RE = re.compile(r"^[a-z][a-z0-9+\-]*(?:\.[a-z0-9+\-]+)+$")


# RFC 3986 §2: unreserved, reserved and "%". Anything else (a backslash
# above all: WHATWG URL parsing reads it as "/" in http(s) URLs, Python's
# urlsplit doesn't, so the two disagree on the host) is refused.
_URI_CHARS_RE = re.compile(r"^[A-Za-z0-9\-._~:/?#\[\]@!$&'()*+,;=%]+$")
_DNS_LABEL_RE = re.compile(r"^(?!-)[a-z0-9-]{1,63}(?<!-)$")


def has_only_uri_characters(uri: str) -> bool:
    return bool(_URI_CHARS_RE.match(uri))


def _host_problem(netloc: str) -> str | None:
    """Why the host in ``netloc`` (userinfo already refused) is not a
    DNS name or an IP literal, or None."""
    host = netloc
    if host.startswith("["):
        literal, _, _rest = host[1:].partition("]")
        try:
            ipaddress.IPv6Address(literal)
        except ValueError:
            return "a redirect_uri's host must be a DNS name or an IP address"
        return None
    host = host.rsplit(":", 1)[0] if ":" in host else host
    labels = host.split(".")
    # WHATWG reads a host whose last label is a number (decimal or 0x hex)
    # as an IPv4 address ("0x7f.1" is 127.0.0.1); only the dotted-decimal
    # form both parsers agree on is allowed.
    if all(label.isdigit() for label in labels) or re.match(r"^(\d+|0x[0-9a-f]*)$", labels[-1]):
        try:
            ipaddress.IPv4Address(host)
        except ValueError:
            return "a redirect_uri's host must be a DNS name or an IP address"
        return None
    if (
        not host
        or len(host) > 253
        or host != host.lower()
        or not all(_DNS_LABEL_RE.match(label) for label in labels)
    ):
        return "a redirect_uri's host must be a lower-case DNS name or an IP address"
    return None


def redirect_uri_problem(uri: object, *, allow_private_use: bool = False) -> str | None:
    """Why ``uri`` may not be a client's redirect URI, or None if it may:
    ``https://`` with a host, or loopback ``http://``, both spelled in
    lower case with a port, if any, in 1-65535; no fragment, wildcard,
    userinfo, whitespace or control characters; at most
    DCR_MAX_REDIRECT_URI_LENGTH characters; only RFC 3986 characters (no
    backslash); an http(s) host that is a lower-case DNS name or an IP
    literal, so every URL parser, and the consent page, agree on it.

    With ``allow_private_use`` (metadata documents: a client proven by
    its https host), also an RFC 8252 §7.1 private-use scheme in reverse
    domain form (``com.example.app:/callback``). Never ``javascript:``,
    ``data:`` and the like, in any case: the code is handed to the
    redirect by a browser navigation (CHT-1518 review S1, CHT-1519 B1)."""
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
    if not _URI_CHARS_RE.match(uri):
        return "a redirect_uri may contain only RFC 3986 characters (no backslash, quotes, spaces, <>, {}, | or ^)"
    scheme = uri.split(":", 1)[0] if ":" in uri else ""
    if scheme.lower() in _DANGEROUS_SCHEMES:
        return f"a redirect_uri must not use the {scheme.lower()}: scheme"
    try:
        parts = urlsplit(uri)
        port = parts.port
    except ValueError:
        return "a redirect_uri must be a valid URL"
    if parts.username is not None or parts.password is not None:
        return "a redirect_uri must not carry credentials"
    if port == 0:
        return "a redirect_uri must not use port 0"
    if uri.startswith("https://") and parts.hostname:
        return _host_problem(parts.netloc)
    if uri.startswith("http://") and is_loopback_redirect(uri):
        return None
    if (
        allow_private_use
        and _PRIVATE_USE_SCHEME_RE.match(scheme)
        and len(uri) > len(scheme) + 1
    ):
        return None
    if allow_private_use:
        return "a redirect_uri must be https, http on a loopback host, or a reverse-domain private-use scheme"
    return "a redirect_uri must be https, or http on a loopback host"


def dcr_redirect_uri_problem(uri: object) -> str | None:
    """The rule for a dynamically registered redirect URI: ``https`` or
    loopback ``http`` only (``redirect_uri_problem``). A DCR client is
    unproven, so it gets no private-use schemes."""
    return redirect_uri_problem(uri)


def redirect_host(uri: str) -> str:
    """What the consent page shows as where the code goes: the host a
    browser would go to. redirect_uri_problem keeps the parsers in
    agreement for anything stored from now on; for http(s) a backslash is
    also read as "/" here, as WHATWG URL parsing does, so even a row
    stored before that rule can't show one host and send to another."""
    if uri[:8].lower() == "https://" or uri[:7].lower() == "http://":
        uri = uri.replace("\\", "/")
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
    # Exact CIMD client_ids, compared as strings. Not hosts: a vendor
    # host can serve documents for things that aren't that vendor's
    # client (user content, other products), and a badge is a claim
    # about one specific client.
    client_ids: frozenset[str]


# Advisory only: a match puts a "recognized" badge on the consent page.
# It never skips consent (design §2.3). DCR clients are never recognized,
# whatever they call themselves or wherever they redirect. Only client_ids
# their vendor documents: claude.ai's and ChatGPT's connector CIMD URLs
# are not published, so they get no badge until they are (CHT-1580).
# check_client_id_url allows only the default port, so an exact match
# here is always the vendor's own https origin.
KNOWN_CLIENTS: tuple[KnownClient, ...] = (
    KnownClient("Claude Code", client_ids=frozenset({"https://claude.ai/oauth/claude-code-client-metadata"})),
)


def known_client_name(client_id: str) -> str | None:
    """The recognized name of a CIMD client_id (an exact match), or None."""
    for known in KNOWN_CLIENTS:
        if client_id in known.client_ids:
            return known.name
    return None
