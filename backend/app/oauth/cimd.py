"""Client ID Metadata Documents: the SSRF-hardened fetch (CHT-1518;
design doc §2.2, threat S8).

A URL-shaped ``client_id`` names a JSON document, served by the client
at that URL, that describes it (draft-ietf-oauth-client-id-metadata-
document; the MCP authorization spec 2026-07-28 makes it the preferred
registration). This server fetches it while handling /oauth/authorize,
which means an unauthenticated caller chooses a URL this server will
request. So the fetch is fenced:

* the URL is ``https``, has a host and a path, and carries no userinfo,
  fragment or dot segments (``check_client_id_url``);
* the host is resolved here, and every address it resolves to must be
  public: loopback, private, link-local, CGNAT (100.64/10), multicast,
  reserved and unspecified addresses are refused, as are IPv4-mapped and
  6to4/Teredo forms of them (``is_public_address``). Only the default
  port (443) is fetched, so the fetch can't be pointed at some other
  service on a public host. The connection then
  goes to the vetted address, with the host name used only for SNI,
  certificate verification and the Host header, so a second DNS answer
  (rebinding) is never consulted;
* no redirects, no proxy (``trust_env=False``: a proxy would resolve
  the name again), 3 s for the whole exchange, at most 16 KB of body.
  The 16 KB are counted on the wire: the request asks for
  ``Accept-Encoding: identity`` and any response that is content-encoded
  anyway is refused, so a small compressed body can't inflate into a
  large one in memory. The response must be ``application/json`` (or a
  ``+json`` type).

What the document must say is checked by ``parse_client_metadata``:
``client_id`` equal to the URL exactly, a non-empty ``redirect_uris``
list whose every entry passes the same rules as a dynamically registered
one (``https``, or ``http`` on a loopback host), plus RFC 8252 §7.1
private-use schemes in reverse-domain form for native apps; never
``javascript:``, ``data:`` or the like (``app.oauth.clients.
redirect_uri_problem``), and ``token_endpoint_auth_method`` ``none`` (or absent; a CIMD
client has no shared secret, and ``private_key_jwt`` is not supported in
v1).

How long a document is trusted comes from the response's Cache-Control,
clamped to [5 min, 24 h] (``cache_seconds``).
"""
from __future__ import annotations

import asyncio
import ipaddress
import json
import re
import socket
from dataclasses import dataclass
from urllib.parse import urlsplit

import httpx

from app.oauth.clients import redirect_uri_problem

FETCH_TIMEOUT_SECONDS = 3.0
MAX_DOCUMENT_BYTES = 16 * 1024
MAX_CLIENT_ID_LENGTH = 512
# A document lists a client's redirect URIs; more than this is not a
# client, it's an attempt to make the consent page or the matcher slow.
MAX_DOCUMENT_REDIRECT_URIS = 20
CACHE_MIN_SECONDS = 5 * 60
CACHE_MAX_SECONDS = 24 * 3600

# 100.64.0.0/10 (RFC 6598). ``is_global`` already excludes it on current
# Pythons; listed explicitly so the rule doesn't depend on that.
_CGNAT = ipaddress.ip_network("100.64.0.0/10")

# Tests swap in an ``httpx.MockTransport``; None is the real network.
_transport: httpx.AsyncBaseTransport | None = None


class CIMDError(Exception):
    """The client_id's metadata document can't be used. ``description``
    is safe to show the person authorizing (it names no internal
    address)."""

    def __init__(self, description: str):
        super().__init__(description)
        self.description = description


@dataclass(frozen=True)
class FetchedDocument:
    body: bytes
    cache_control: str | None


def looks_like_cimd(client_id: str) -> bool:
    """Is this client_id URL-shaped (and so names a metadata document)?"""
    return client_id.startswith("https://") or client_id.startswith("http://")


def check_client_id_url(client_id: str) -> None:
    """Raise CIMDError unless ``client_id`` is a URL this server may fetch."""
    if len(client_id) > MAX_CLIENT_ID_LENGTH:
        raise CIMDError("the client_id URL is too long")
    if not client_id.isascii() or any(c.isspace() or ord(c) < 0x20 or ord(c) == 0x7F for c in client_id):
        raise CIMDError("the client_id URL contains whitespace, control or non-ASCII characters")
    parts = urlsplit(client_id)
    if parts.scheme != "https":
        raise CIMDError("a client_id URL must use https")
    if not parts.hostname:
        raise CIMDError("the client_id URL has no host")
    if parts.username is not None or parts.password is not None:
        raise CIMDError("the client_id URL must not carry credentials")
    if parts.fragment or "#" in client_id:
        raise CIMDError("the client_id URL must not have a fragment")
    if parts.path in ("", "/"):
        raise CIMDError("the client_id URL must have a path")
    if any(seg in (".", "..") for seg in parts.path.split("/")):
        raise CIMDError("the client_id URL must not contain dot segments")
    try:
        port = parts.port
    except ValueError:
        raise CIMDError("the client_id URL has an invalid port") from None
    if port is not None and port != 443:
        raise CIMDError("a client_id URL must use the default https port")


def is_public_address(address: str) -> bool:
    """May this server connect to ``address``? Only globally routable
    unicast addresses, checked through IPv4-in-IPv6 encodings."""
    try:
        ip = ipaddress.ip_address(address.split("%", 1)[0])
    except ValueError:
        return False
    if isinstance(ip, ipaddress.IPv6Address):
        embedded = ip.ipv4_mapped or ip.sixtofour or (ip.teredo[1] if ip.teredo else None)
        if embedded is not None and not is_public_address(str(embedded)):
            return False
    if isinstance(ip, ipaddress.IPv4Address) and ip in _CGNAT:
        return False
    return bool(
        ip.is_global
        and not ip.is_private
        and not ip.is_loopback
        and not ip.is_link_local
        and not ip.is_multicast
        and not ip.is_reserved
        and not ip.is_unspecified
    )


async def _resolve(host: str, port: int) -> list[str]:
    # On the loop's default executor; a slow resolver holds a thread
    # past the 3 s timeout (CHT-1579).
    loop = asyncio.get_running_loop()
    try:
        infos = await loop.getaddrinfo(host, port, type=socket.SOCK_STREAM)
    except (socket.gaierror, UnicodeError):
        raise CIMDError("the client_id URL's host does not resolve") from None
    return list(dict.fromkeys(info[4][0] for info in infos))


async def resolve_public(host: str, port: int) -> str:
    """Resolve ``host`` and return an address to connect to. Every address
    it resolves to must be public: a name with one private answer among
    public ones is refused outright, rather than racing on which answer
    gets used."""
    try:
        literal = ipaddress.ip_address(host.strip("[]"))
    except ValueError:
        literal = None
    addresses = [str(literal)] if literal is not None else await _resolve(host, port)
    if not addresses:
        raise CIMDError("the client_id URL's host does not resolve")
    if not all(is_public_address(a) for a in addresses):
        raise CIMDError("the client_id URL's host is not a public address")
    return addresses[0]


async def fetch(url: str) -> FetchedDocument:
    """Fetch a metadata document under the rules in the module docstring."""
    check_client_id_url(url)
    try:
        return await asyncio.wait_for(_fetch(url), timeout=FETCH_TIMEOUT_SECONDS)
    except asyncio.TimeoutError:
        raise CIMDError("fetching the client's metadata document timed out") from None


async def _fetch(url: str) -> FetchedDocument:
    parts = urlsplit(url)
    host = parts.hostname
    port = 443  # check_client_id_url allows no other
    address = await resolve_public(host, port)
    netloc = f"[{address}]" if ":" in address else address
    target = parts._replace(netloc=f"{netloc}:{port}").geturl()
    try:
        async with httpx.AsyncClient(
            follow_redirects=False, trust_env=False, timeout=FETCH_TIMEOUT_SECONDS, transport=_transport,
        ) as client:
            request = client.build_request(
                "GET", target,
                headers={"Host": host, "Accept": "application/json", "Accept-Encoding": "identity"},
                # Certificate and SNI are checked against the name, not
                # the address connected to.
                extensions={"sni_hostname": host},
            )
            response = await client.send(request, stream=True)
            try:
                if response.status_code != 200:
                    raise CIMDError(f"the client's metadata document answered HTTP {response.status_code}")
                encoding = response.headers.get("content-encoding", "").strip().lower()
                if encoding not in ("", "identity"):
                    # Asked for identity; decompressing anyway would make
                    # the 16 KB cap a cap on compressed bytes only.
                    raise CIMDError("the client's metadata document was sent compressed; it must be sent uncompressed")
                if not _is_json_type(response.headers.get("content-type")):
                    raise CIMDError("the client's metadata document is not served as application/json")
                declared = (response.headers.get("content-length") or "").strip()
                if declared.isdigit() and int(declared) > MAX_DOCUMENT_BYTES:
                    raise CIMDError("the client's metadata document is larger than 16 KB")
                body = bytearray()
                # Raw: bytes as received, never decoded by httpx.
                async for chunk in response.aiter_raw():
                    body.extend(chunk)
                    if len(body) > MAX_DOCUMENT_BYTES:
                        raise CIMDError("the client's metadata document is larger than 16 KB")
                return FetchedDocument(bytes(body), response.headers.get("cache-control"))
            finally:
                await response.aclose()
    except httpx.HTTPError:
        raise CIMDError("the client's metadata document could not be fetched") from None


def _is_json_type(content_type: str | None) -> bool:
    """``application/json`` or ``application/<something>+json``, with
    any parameters."""
    if not content_type:
        return False
    media = content_type.split(";", 1)[0].strip().lower()
    return media == "application/json" or (media.startswith("application/") and media.endswith("+json"))


_MAX_AGE = re.compile(r"(?:^|,)\s*(?:s-maxage|max-age)\s*=\s*\"?(\d+)\"?", re.IGNORECASE)


def cache_seconds(cache_control: str | None) -> int:
    """How long to trust a fetched document: its ``max-age``, clamped to
    [CACHE_MIN_SECONDS, CACHE_MAX_SECONDS]. ``no-store``/``no-cache``, or
    no usable directive, get the minimum."""
    if not cache_control:
        return CACHE_MIN_SECONDS
    lowered = cache_control.lower()
    if "no-store" in lowered or "no-cache" in lowered:
        return CACHE_MIN_SECONDS
    match = _MAX_AGE.search(cache_control)
    if not match:
        return CACHE_MIN_SECONDS
    return max(CACHE_MIN_SECONDS, min(CACHE_MAX_SECONDS, int(match.group(1))))


def parse_client_metadata(client_id: str, body: bytes) -> dict:
    """The document as a dict, checked against what a CIMD client must
    declare. Raises CIMDError."""
    try:
        document = json.loads(body)
    except (ValueError, UnicodeDecodeError):
        raise CIMDError("the client's metadata document is not JSON") from None
    if not isinstance(document, dict):
        raise CIMDError("the client's metadata document is not a JSON object")
    if document.get("client_id") != client_id:
        raise CIMDError("the metadata document's client_id does not match the URL it was fetched from")
    redirect_uris = document.get("redirect_uris")
    if (
        not isinstance(redirect_uris, list)
        or not redirect_uris
        or not all(isinstance(u, str) and u for u in redirect_uris)
    ):
        raise CIMDError("the client's metadata document declares no redirect_uris")
    if len(redirect_uris) > MAX_DOCUMENT_REDIRECT_URIS:
        raise CIMDError(f"the client's metadata document declares more than {MAX_DOCUMENT_REDIRECT_URIS} redirect_uris")
    for uri in redirect_uris:
        problem = redirect_uri_problem(uri, allow_private_use=True)
        if problem:
            raise CIMDError(f"the client's metadata document has an unusable redirect_uri: {problem}")
    method = document.get("token_endpoint_auth_method", "none")
    if method != "none":
        raise CIMDError(f"token_endpoint_auth_method {method!r} is not supported for metadata-document clients")
    name = document.get("client_name")
    if name is not None and not isinstance(name, str):
        raise CIMDError("the metadata document's client_name is not a string")
    return document
