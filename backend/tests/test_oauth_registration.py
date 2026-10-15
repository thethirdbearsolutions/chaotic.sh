"""OAuth client registration (CHT-1518; design doc §2.2): CIMD fetch and
cache, DCR at /oauth/register, redirect matching, the known-clients
table, and the CHT-1564 rule that the public OAuth POST endpoints take
no cookie or session auth.
"""
import ast
import asyncio
import gzip
import inspect
import json
import textwrap
from datetime import datetime, timedelta, timezone

import httpx
import pytest

from app.config import get_settings
from app.enums import OAuthClientRegistration
from app.oauth import cimd, ratelimit
from app.oauth.clients import (
    canonical_resource,
    dcr_redirect_uri_problem,
    known_client_name,
    redirect_uri_matches,
    redirect_uri_problem,
    reserved_redirect_problem,
)
from app.oxyde_models.oauth import OxydeOAuthClient
from app.services.oauth_client_service import (
    OAuthClientError,
    OAuthClientService,
    hash_client_secret,
    hash_ip,
)

BASE = "https://tracker.example.com"
CIMD_URL = "https://app.example.org/oauth/client.json"
CLAUDE_CODE = "https://claude.ai/oauth/claude-code-client-metadata"


@pytest.fixture
def oauth_settings(monkeypatch):
    def _set(enabled: bool = True, dcr: bool = True, **extra):
        monkeypatch.setenv("OAUTH_ENABLED", "true" if enabled else "false")
        monkeypatch.setenv("APP_BASE_URL", BASE)
        monkeypatch.setenv("OAUTH_DCR_ENABLED", "true" if dcr else "false")
        for key, value in extra.items():
            monkeypatch.setenv(key.upper(), str(value))
        get_settings.cache_clear()

    _set()
    ratelimit.cimd_fetches.clear()
    ratelimit.authorize_requests.clear()
    yield _set
    get_settings.cache_clear()
    ratelimit.cimd_fetches.clear()
    ratelimit.authorize_requests.clear()


def _doc(client_id=CIMD_URL, **overrides):
    document = {
        "client_id": client_id,
        "client_name": "Example App",
        "redirect_uris": ["https://app.example.org/callback"],
        "token_endpoint_auth_method": "none",
    }
    document.update(overrides)
    return document


class _FakeFetch:
    """Stands in for cimd.fetch: returns `document` and counts calls."""

    def __init__(self, document=None, cache_control="max-age=600", error=None):
        self.document = document
        self.cache_control = cache_control
        self.error = error
        self.calls = 0

    async def __call__(self, url):
        self.calls += 1
        if self.error:
            raise cimd.CIMDError(self.error)
        return cimd.FetchedDocument(json.dumps(self.document or _doc(url)).encode(), self.cache_control)


# --- redirect matching ----------------------------------------------------


class TestRedirectMatching:
    def test_exact_match(self):
        assert redirect_uri_matches(["https://a.example/cb"], "https://a.example/cb")

    @pytest.mark.parametrize("presented", [
        "https://a.example/cb/", "https://A.example/cb", "https://a.example:443/cb",
        "https://a.example/cb?x=1", "https://a.example/cb#f", "https://a.example/c",
        "http://a.example/cb", "",
    ])
    def test_nothing_else_is_normalised(self, presented):
        assert not redirect_uri_matches(["https://a.example/cb"], presented)

    @pytest.mark.parametrize("registered,presented", [
        ("http://localhost/callback", "http://localhost:53122/callback"),
        ("http://localhost:8080/callback", "http://localhost:1/callback"),
        ("http://127.0.0.1/callback", "http://127.0.0.1:65535/callback"),
        ("http://[::1]:9/cb", "http://[::1]:10/cb"),
        ("http://127.0.0.1:5/cb?x=1", "http://127.0.0.1/cb?x=1"),
    ])
    def test_loopback_ignores_the_port(self, registered, presented):
        assert redirect_uri_matches([registered], presented)

    @pytest.mark.parametrize("registered,presented", [
        # The host is part of the registration: localhost != 127.0.0.1.
        ("http://localhost/callback", "http://127.0.0.1:5000/callback"),
        ("http://localhost/callback", "http://localhost:5000/other"),
        ("http://localhost/callback", "http://localhost:0/callback"),
        ("http://localhost/callback", "http://localhost:99999/callback"),
        ("http://localhost/callback", "http://localhost:80@evil.example/callback"),
        ("http://localhost/callback", "https://localhost:5000/callback"),
        ("http://localhost/callback", "http://localhost.evil.example:5000/callback"),
        # A non-loopback host's port is significant.
        ("http://app.example/cb", "http://app.example:8080/cb"),
        ("https://app.example/cb", "https://app.example:8443/cb"),
    ])
    def test_loopback_rule_is_narrow(self, registered, presented):
        assert not redirect_uri_matches([registered], presented)

    def test_claude_code_style_registration_matches_both_hosts(self):
        registered = ["http://localhost/callback", "http://127.0.0.1/callback"]
        assert redirect_uri_matches(registered, "http://localhost:4242/callback")
        assert redirect_uri_matches(registered, "http://127.0.0.1:4242/callback")


class TestDCRRedirectRules:
    @pytest.mark.parametrize("uri", [
        "https://app.example/cb", "http://localhost:3000/cb", "http://127.0.0.1/cb", "http://[::1]:5/cb",
        "https://203.0.113.9/cb", "https://[2001:db8::1]:8443/cb", "https://xn--bcher-kva.example/cb",
        "https://app.example/cb?x=1&y=%20",
    ])
    def test_allowed(self, uri):
        assert dcr_redirect_uri_problem(uri) is None

    @pytest.mark.parametrize("uri,why", [
        ("http://app.example/cb", "https"),
        ("https://app.example/cb#frag", "fragment"),
        ("https://*.example/cb", "wildcard"),
        ("https://user:pw@app.example/cb", "credentials"),
        ("https://app.example/" + "a" * 600, "512"),
        ("javascript:alert(1)", "javascript"),
        ("com.example.app:/cb", "https"),
        ("https:///cb", "https"),
        ("https://app.example/c b", "whitespace"),
        ("https://app.example:99999/cb", "valid URL"),
        ("https://app.example:0/cb", "port 0"),
        ("http://localhost:0/cb", "port 0"),
        ("HTTPS://app.example/cb", "https"),
        ("Https://app.example/cb", "https"),
        ("HTTP://localhost/cb", "https"),
        ("JavaScript:alert(1)", "javascript"),
        ("data:text/html,x", "data"),
        # Review S6: no character two URL parsers could read differently.
        ("https://evil.example\\.claude.ai/cb", "RFC 3986"),
        ("https://app.example/c\"b", "RFC 3986"),
        ("https://app.example/c<b>", "RFC 3986"),
        ("https://app.example/c{b}", "RFC 3986"),
        ("https://APP.example/cb", "DNS name"),
        ("https://a..b/cb", "DNS name"),
        ("https://-a.example/cb", "DNS name"),
        ("https://a_b.example/cb", "DNS name"),
        ("https://evil%2eexample/cb", "DNS name"),
        ("https://0x7f.1/cb", "IP address"),
        ("https://foo.123/cb", "IP address"),
        ("https://1.2.3/cb", "IP address"),
        ("", "non-empty"),
        (42, "non-empty"),
    ])
    def test_refused(self, uri, why):
        assert why in dcr_redirect_uri_problem(uri)


class TestRedirectHost:
    """What the consent page names as the redirect's host is the host a
    browser goes to (review S6)."""

    @pytest.mark.parametrize("uri,host", [
        ("https://app.example/cb", "app.example"),
        ("https://evil.example\\.claude.ai/cb", "evil.example"),
        ("HTTPS://evil.example\\.claude.ai/cb", "evil.example"),
        ("http://localhost:8080/cb", "localhost"),
        ("com.example.app:/cb", "com.example.app:/cb"),
    ])
    def test_host(self, uri, host):
        from app.oauth.clients import redirect_host
        assert redirect_host(uri) == host


class TestDocumentRedirectRules:
    """What a metadata document's redirect_uris may be (CHT-1518 review
    S1): the DCR rules plus reverse-domain private-use schemes; never a
    scheme a browser would execute, in any case."""

    @pytest.mark.parametrize("uri", [
        "https://app.example/cb", "http://127.0.0.1/cb", "com.example.app:/oauth/cb", "com.example.app://cb",
    ])
    def test_allowed(self, uri):
        assert redirect_uri_problem(uri, allow_private_use=True) is None

    @pytest.mark.parametrize("uri", [
        "javascript:alert(document.domain)", "JAVASCRIPT:alert(1)", "JavaScript://%0aalert(1)",
        "data:text/html,<script>alert(1)</script>", "DATA:text/html,x", "vbscript:msgbox", "VBScript:x",
        "file:///etc/passwd", "blob:https://app.example/x", "about:blank",
        "http://app.example/cb", "HTTPS://app.example/cb", "Com.Example.App:/cb", "myapp:/cb", "com.example.app:",
        "https://app.example:0/cb",
        "https://evil.example\\.claude.ai/cb", "https://evil.example\\@claude.ai/cb",
        "com.example.app:/c\\b",
    ])
    def test_refused(self, uri):
        assert redirect_uri_problem(uri, allow_private_use=True) is not None
        assert dcr_redirect_uri_problem(uri) is not None


class TestReservedAppRedirect:
    """CHT-1649: the Android app's App Links paths belong to the built-in
    client; no registration or metadata document may name them."""

    @pytest.mark.parametrize("uri", [
        "https://chaotic.sh/app/oauth2redirect", "https://chaotic.sh/app/oauth2redirect/",
        "https://chaotic.sh/app/other?x=1", "https://chaotic.sh/app", "https://chaotic.sh:443/app/oauth2redirect",
    ])
    def test_refused_for_every_other_client(self, uri):
        assert redirect_uri_problem(uri) is None  # a well-formed https URI...
        assert reserved_redirect_problem(uri) is not None  # ...that is the app's
        assert dcr_redirect_uri_problem(uri) is not None
        with pytest.raises(cimd.CIMDError, match="reserved for the Chaotic app"):
            cimd.parse_client_metadata(CIMD_URL, json.dumps(_doc(redirect_uris=[uri])).encode())

    @pytest.mark.parametrize("uri", [
        "https://chaotic.sh/oauth/cb", "https://chaotic.sh/apps/cb", "https://www.chaotic.sh/app/oauth2redirect",
        "https://app.example/app/oauth2redirect",
    ])
    def test_the_rest_of_the_domain_is_not_reserved(self, uri):
        assert reserved_redirect_problem(uri) is None
        assert dcr_redirect_uri_problem(uri) is None


class TestResource:
    @pytest.mark.parametrize("value", [BASE, BASE + "/", BASE + "/mcp", BASE + "/mcp/"])
    def test_both_published_identifiers_are_accepted_with_or_without_slash(self, value):
        """CHT-1564: the root and /mcp resource values, each with and
        without a trailing slash, all name /mcp."""
        assert canonical_resource(value, BASE) == BASE + "/mcp"

    @pytest.mark.parametrize("value", [
        BASE + "//", BASE + "/api", "https://other.example/mcp", "https://tracker.example.com.evil/mcp",
        "http://tracker.example.com/mcp", BASE + "/mcp//", "",
    ])
    def test_anything_else_is_not_this_server(self, value):
        assert canonical_resource(value, BASE) is None


class TestKnownClients:
    def test_claude_code(self):
        assert known_client_name(CLAUDE_CODE) == "Claude Code"

    @pytest.mark.parametrize("client_id", [
        # Exact client_ids only (review S2): another document on the same
        # host is not that client.
        "https://claude.ai/oauth/mcp-oauth-client-metadata", "https://chatgpt.com/oauth/client.json",
        "https://claude.ai/user-content/claude-code-client-metadata",
        CLAUDE_CODE + "/", CLAUDE_CODE + "?x", "https://claude.ai:443/oauth/claude-code-client-metadata",
        "https://claude.ai:8443/oauth/claude-code-client-metadata",
        "https://claude.ai.evil.example/x", "https://evil.example/claude.ai", "http://claude.ai/x",
        "dcr_0123", "Claude",
    ])
    def test_not_recognized(self, client_id):
        assert known_client_name(client_id) is None


# --- CIMD fetch -----------------------------------------------------------


class TestClientIdURL:
    @pytest.mark.parametrize("url", [CIMD_URL, "https://app.example:443/meta", CLAUDE_CODE])
    def test_fetchable(self, url):
        cimd.check_client_id_url(url)

    @pytest.mark.parametrize("url,why", [
        ("http://app.example/meta", "https"),
        ("https://app.example", "path"),
        ("https://app.example/", "path"),
        ("https://u:p@app.example/meta", "credentials"),
        ("https://app.example/meta#x", "fragment"),
        ("https://app.example/a/../meta", "dot segments"),
        ("https://app.example:abc/meta", "port"),
        ("https://app.example:8443/meta", "default https port"),
        ("https://app.example:22/meta", "default https port"),
        ("https://app.example:0/meta", "default https port"),
        ("https://evil.example\\.claude.ai/meta", "RFC 3986"),
        ("https:///meta", "no host"),
        ("https://app.example/me ta", "whitespace"),
        ("https://app.example/" + "a" * 600, "too long"),
    ])
    def test_refused(self, url, why):
        with pytest.raises(cimd.CIMDError, match=why):
            cimd.check_client_id_url(url)


class TestPublicAddress:
    @pytest.mark.parametrize("address", ["8.8.8.8", "1.1.1.1", "2606:4700:4700::1111"])
    def test_public(self, address):
        assert cimd.is_public_address(address)

    @pytest.mark.parametrize("address", [
        "127.0.0.1", "10.0.0.1", "172.16.0.1", "192.168.1.1", "169.254.169.254", "100.64.0.1",
        "100.127.255.254", "0.0.0.0", "224.0.0.1", "240.0.0.1", "255.255.255.255",
        "::1", "::", "fe80::1", "fc00::1", "ff02::1",
        "::ffff:127.0.0.1", "::ffff:169.254.169.254", "2002:7f00:1::", "2001:0:4136:e378:8000:63bf:80ff:fffe",
        "not-an-ip", "fe80::1%eth0",
    ])
    def test_not_public(self, address):
        assert not cimd.is_public_address(address)


class TestResolve:
    async def test_every_answer_must_be_public(self, monkeypatch):
        async def answers(host, port):
            return ["93.184.216.34", "10.0.0.5"]
        monkeypatch.setattr(cimd, "_resolve", answers)
        with pytest.raises(cimd.CIMDError, match="not a public address"):
            await cimd.resolve_public("app.example", 443)

    async def test_literal_addresses_are_checked_without_dns(self):
        with pytest.raises(cimd.CIMDError):
            await cimd.resolve_public("127.0.0.1", 443)
        with pytest.raises(cimd.CIMDError):
            await cimd.resolve_public("[::1]", 443)
        assert await cimd.resolve_public("8.8.8.8", 443) == "8.8.8.8"

    async def test_unresolvable(self, monkeypatch):
        async def nothing(host, port):
            return []
        monkeypatch.setattr(cimd, "_resolve", nothing)
        with pytest.raises(cimd.CIMDError, match="does not resolve"):
            await cimd.resolve_public("app.example", 443)

    async def test_real_resolver_refuses_localhost(self):
        with pytest.raises(cimd.CIMDError):
            await cimd.resolve_public("localhost", 443)

    async def test_real_resolver_failure(self):
        with pytest.raises(cimd.CIMDError, match="does not resolve"):
            await cimd.resolve_public("no-such-host.invalid", 443)


class _Chunked(httpx.AsyncByteStream):
    """A body that arrives over the wire, as from a real server (a
    Response built from bytes counts as already read)."""

    def __init__(self, body):
        self.body = body

    async def __aiter__(self):
        for i in range(0, len(self.body), 4096):
            yield self.body[i:i + 4096]


class _Seen(list):
    pass


@pytest.fixture
def mock_network(monkeypatch):
    """Route cimd's HTTP through a MockTransport; DNS answers a public
    address. Yields a list the handler's requests are appended to."""
    seen = _Seen()
    state = {"handler": lambda request: httpx.Response(200, json=_doc())}

    async def public(host, port):
        return ["93.184.216.34"]

    def handler(request):
        seen.append(request)
        canned = state["handler"](request)
        if isinstance(canned.stream, _Chunked):
            return canned
        # The raw bytes as given (``.content`` would decode them).
        raw = b"".join(canned.stream)
        return httpx.Response(canned.status_code, headers=canned.headers, stream=_Chunked(raw))

    monkeypatch.setattr(cimd, "_resolve", public)
    monkeypatch.setattr(cimd, "_transport", httpx.MockTransport(handler))
    seen.set = lambda h: state.__setitem__("handler", h)
    return seen


class TestFetch:
    async def test_connects_to_the_vetted_address_with_the_name_for_tls(self, mock_network):
        fetched = await cimd.fetch(CIMD_URL)
        assert json.loads(fetched.body)["client_id"] == CIMD_URL
        (request,) = mock_network
        assert request.url.host == "93.184.216.34"
        assert request.url.path == "/oauth/client.json"
        assert request.headers["host"] == "app.example.org"
        assert request.extensions["sni_hostname"] == "app.example.org"

    async def test_only_the_default_port_is_fetched(self, mock_network):
        with pytest.raises(cimd.CIMDError, match="default https port"):
            await cimd.fetch("https://app.example.org:8443/meta")
        assert mock_network == []
        await cimd.fetch("https://app.example.org:443/meta")
        (request,) = mock_network
        assert request.url.port in (None, 443)  # httpx drops the default port
        assert request.headers["host"] == "app.example.org"

    async def test_asks_for_an_uncompressed_body(self, mock_network):
        await cimd.fetch(CIMD_URL)
        (request,) = mock_network
        assert request.headers["accept-encoding"] == "identity"

    @pytest.mark.parametrize("encoding", ["gzip", "deflate", "br", "GZIP", "gzip, identity"])
    async def test_a_compressed_body_is_refused_unread(self, mock_network, encoding):
        """A gzip bomb: 16 KB on the wire, megabytes decoded. Refused on
        the header, so nothing is decompressed (review B1)."""
        bomb = gzip.compress(b" " * (8 * 1024 * 1024))
        assert len(bomb) < cimd.MAX_DOCUMENT_BYTES
        mock_network.set(lambda r: httpx.Response(
            200, stream=_Chunked(bomb), headers={"Content-Encoding": encoding, "Content-Type": "application/json"},
        ))
        with pytest.raises(cimd.CIMDError, match="compressed"):
            await cimd.fetch(CIMD_URL)

    async def test_raw_bytes_are_what_is_capped(self, mock_network, monkeypatch):
        """Even if the encoding check were bypassed, the cap counts bytes
        as received, never as decoded."""
        monkeypatch.setattr(httpx.Response, "aiter_bytes", None)  # not used
        body = json.dumps(_doc()).encode()
        mock_network.set(lambda r: httpx.Response(
            200, content=body, headers={"Content-Encoding": "identity", "Content-Type": "application/json"},
        ))
        assert (await cimd.fetch(CIMD_URL)).body == body

    @pytest.mark.parametrize("content_type", [
        "application/json", "application/json; charset=utf-8", "Application/JSON",
        "application/oauth-client-metadata+json",
    ])
    async def test_json_content_types(self, mock_network, content_type):
        mock_network.set(lambda r: httpx.Response(
            200, content=json.dumps(_doc()).encode(), headers={"Content-Type": content_type},
        ))
        await cimd.fetch(CIMD_URL)

    @pytest.mark.parametrize("content_type", [None, "text/html", "text/plain", "application/jsonp", "text/json"])
    async def test_other_content_types_are_refused(self, mock_network, content_type):
        headers = {"Content-Type": content_type} if content_type else {}
        mock_network.set(lambda r: httpx.Response(200, content=json.dumps(_doc()).encode(), headers=headers))
        with pytest.raises(cimd.CIMDError, match="application/json"):
            await cimd.fetch(CIMD_URL)

    async def test_declared_length_over_the_cap_is_refused_unread(self, mock_network):
        mock_network.set(lambda r: httpx.Response(200, content=b"{}", headers={
            "Content-Type": "application/json", "Content-Length": str(cimd.MAX_DOCUMENT_BYTES + 1),
        }))
        with pytest.raises(cimd.CIMDError, match="16 KB"):
            await cimd.fetch(CIMD_URL)

    async def test_redirects_are_not_followed(self, mock_network):
        mock_network.set(lambda r: httpx.Response(302, headers={"Location": "http://169.254.169.254/"}))
        with pytest.raises(cimd.CIMDError, match="HTTP 302"):
            await cimd.fetch(CIMD_URL)
        assert len(mock_network) == 1

    async def test_size_cap(self, mock_network):
        def big(request):
            response = httpx.Response(200, content=b"x" * (cimd.MAX_DOCUMENT_BYTES + 1),
                                      headers={"Content-Type": "application/json"})
            del response.headers["content-length"]
            return response
        mock_network.set(big)
        with pytest.raises(cimd.CIMDError, match="16 KB"):
            await cimd.fetch(CIMD_URL)

    async def test_timeout(self, mock_network, monkeypatch):
        monkeypatch.setattr(cimd, "FETCH_TIMEOUT_SECONDS", 0.05)

        async def slow(host, port):
            await asyncio.sleep(1)
            return ["93.184.216.34"]
        monkeypatch.setattr(cimd, "_resolve", slow)
        with pytest.raises(cimd.CIMDError, match="timed out"):
            await cimd.fetch(CIMD_URL)

    async def test_network_error(self, mock_network):
        def boom(request):
            raise httpx.ConnectError("refused")
        mock_network.set(boom)
        with pytest.raises(cimd.CIMDError, match="could not be fetched"):
            await cimd.fetch(CIMD_URL)

    async def test_private_host_is_never_contacted(self, mock_network, monkeypatch):
        async def private(host, port):
            return ["169.254.169.254"]
        monkeypatch.setattr(cimd, "_resolve", private)
        with pytest.raises(cimd.CIMDError, match="not a public address"):
            await cimd.fetch(CIMD_URL)
        assert mock_network == []

    async def test_http_url_is_never_contacted(self, mock_network):
        with pytest.raises(cimd.CIMDError, match="https"):
            await cimd.fetch("http://app.example.org/meta")
        assert mock_network == []

    async def test_cache_control_is_returned(self, mock_network):
        mock_network.set(lambda r: httpx.Response(200, json=_doc(), headers={"Cache-Control": "max-age=900"}))
        assert (await cimd.fetch(CIMD_URL)).cache_control == "max-age=900"


class TestDocument:
    def test_valid(self):
        assert cimd.parse_client_metadata(CIMD_URL, json.dumps(_doc()).encode())["client_name"] == "Example App"

    def test_auth_method_defaults_to_none(self):
        doc = _doc()
        del doc["token_endpoint_auth_method"]
        cimd.parse_client_metadata(CIMD_URL, json.dumps(doc).encode())

    @pytest.mark.parametrize("body,why", [
        (b"not json", "not JSON"),
        (b"[]", "not a JSON object"),
        (json.dumps(_doc(client_id="https://app.example.org/other")).encode(), "does not match"),
        (json.dumps(_doc(client_id=CIMD_URL + "/")).encode(), "does not match"),
        (json.dumps(_doc(redirect_uris=[])).encode(), "redirect_uris"),
        (json.dumps(_doc(redirect_uris="https://a/cb")).encode(), "redirect_uris"),
        (json.dumps(_doc(redirect_uris=[""])).encode(), "redirect_uris"),
        (json.dumps({k: v for k, v in _doc().items() if k != "redirect_uris"}).encode(), "redirect_uris"),
        (json.dumps(_doc(token_endpoint_auth_method="private_key_jwt")).encode(), "not supported"),
        (json.dumps(_doc(token_endpoint_auth_method="client_secret_post")).encode(), "not supported"),
        (json.dumps(_doc(client_name=["x"])).encode(), "client_name"),
        (json.dumps(_doc(redirect_uris=["javascript:alert(1)"])).encode(), "javascript"),
        (json.dumps(_doc(redirect_uris=["https://app.example.org/cb", "JaVaScRiPt:alert(1)"])).encode(),
         "javascript"),
        (json.dumps(_doc(redirect_uris=["data:text/html,x"])).encode(), "data"),
        (json.dumps(_doc(redirect_uris=["https://evil.example\\.claude.ai/cb"])).encode(), "RFC 3986"),
        (json.dumps(_doc(redirect_uris=["http://app.example.org/cb"])).encode(), "unusable redirect_uri"),
        (json.dumps(_doc(redirect_uris=[f"https://app.example.org/{i}" for i in range(21)])).encode(),
         "more than 20"),
    ])
    def test_refused(self, body, why):
        with pytest.raises(cimd.CIMDError, match=why):
            cimd.parse_client_metadata(CIMD_URL, body)

    @pytest.mark.parametrize("header,seconds", [
        (None, 300), ("", 300), ("no-store", 300), ("no-cache, max-age=3600", 300), ("public", 300),
        ("max-age=60", 300), ("max-age=3600", 3600), ("public, max-age=999999", 86400),
        ('max-age="1200"', 1200), ("s-maxage=7200", 7200),
    ])
    def test_cache_seconds_is_clamped(self, header, seconds):
        assert cimd.cache_seconds(header) == seconds


# --- the client service: CIMD -----------------------------------------------


class TestResolveCIMD:
    async def test_first_resolve_fetches_and_stores(self, db, oauth_settings, monkeypatch):
        fake = _FakeFetch()
        monkeypatch.setattr(cimd, "fetch", fake)
        client = await OAuthClientService().resolve(CIMD_URL, source_ip=None)
        assert client.id == CIMD_URL
        assert client.registration == OAuthClientRegistration.CIMD
        assert client.client_name == "Example App"
        assert json.loads(client.redirect_uris) == ["https://app.example.org/callback"]
        assert client.token_endpoint_auth_method == "none"
        assert fake.calls == 1
        assert timedelta(seconds=590) < client.cache_expires_at - client.fetched_at <= timedelta(seconds=600)

    async def test_cached_until_expiry_then_refetched_in_place(self, db, oauth_settings, monkeypatch):
        fake = _FakeFetch()
        monkeypatch.setattr(cimd, "fetch", fake)
        service = OAuthClientService()
        first = await service.resolve(CIMD_URL, source_ip=None)
        await service.resolve(CIMD_URL, source_ip=None)
        assert fake.calls == 1

        await OxydeOAuthClient.objects.filter(id=CIMD_URL).update(
            cache_expires_at=datetime.now(timezone.utc) - timedelta(seconds=1),
        )
        fake.document = _doc(client_name="Renamed", redirect_uris=["https://app.example.org/new"])
        again = await service.resolve(CIMD_URL, source_ip=None)
        assert fake.calls == 2
        assert again.client_name == "Renamed"
        assert json.loads(again.redirect_uris) == ["https://app.example.org/new"]
        assert again.created_at == first.created_at  # same row, updated in place
        assert await OxydeOAuthClient.objects.filter(id=CIMD_URL).count() == 1

    async def test_failed_refetch_fails_closed(self, db, oauth_settings, monkeypatch):
        monkeypatch.setattr(cimd, "fetch", _FakeFetch())
        await OAuthClientService().resolve(CIMD_URL, source_ip=None)
        await OxydeOAuthClient.objects.filter(id=CIMD_URL).update(
            cache_expires_at=datetime.now(timezone.utc) - timedelta(seconds=1),
        )
        monkeypatch.setattr(cimd, "fetch", _FakeFetch(error="the client's metadata document answered HTTP 500"))
        with pytest.raises(OAuthClientError) as refused:
            await OAuthClientService().resolve(CIMD_URL, source_ip=None)
        assert refused.value.error == "invalid_client"
        assert "HTTP 500" in refused.value.description

    async def test_client_id_mismatch(self, db, oauth_settings, monkeypatch):
        monkeypatch.setattr(cimd, "fetch", _FakeFetch(document=_doc(client_id="https://elsewhere.example/x")))
        with pytest.raises(OAuthClientError, match="does not match"):
            await OAuthClientService().resolve(CIMD_URL, source_ip=None)
        assert await OxydeOAuthClient.objects.filter(id=CIMD_URL).count() == 0

    async def test_disabled_client_is_refused_and_stays_disabled(self, db, oauth_settings, monkeypatch):
        fake = _FakeFetch()
        monkeypatch.setattr(cimd, "fetch", fake)
        await OAuthClientService().resolve(CIMD_URL, source_ip=None)
        await OxydeOAuthClient.objects.filter(id=CIMD_URL).update(is_active=False)
        with pytest.raises(OAuthClientError, match="disabled"):
            await OAuthClientService().resolve(CIMD_URL, source_ip=None)
        assert fake.calls == 1

    async def test_concurrent_first_resolves(self, db, oauth_settings, monkeypatch):
        monkeypatch.setattr(cimd, "fetch", _FakeFetch())
        results = await asyncio.gather(*(OAuthClientService().resolve(CIMD_URL, source_ip=None) for _ in range(3)))
        assert {r.id for r in results} == {CIMD_URL}
        assert await OxydeOAuthClient.objects.filter(id=CIMD_URL).count() == 1

    async def test_lost_create_race_updates_instead(self, db, oauth_settings, monkeypatch):
        """Another request inserts the row between our read and our create."""
        monkeypatch.setattr(cimd, "fetch", _FakeFetch())
        real_get_or_none = OxydeOAuthClient.objects.get_or_none

        async def miss_once(**kwargs):
            await OxydeOAuthClient.objects.create(
                id=CIMD_URL, registration=OAuthClientRegistration.CIMD, redirect_uris="[]", is_active=False,
            )
            return None
        monkeypatch.setattr(OxydeOAuthClient.objects, "get_or_none", miss_once)
        with pytest.raises(OAuthClientError, match="disabled"):
            await OAuthClientService().resolve(CIMD_URL, source_ip=None)
        monkeypatch.setattr(OxydeOAuthClient.objects, "get_or_none", real_get_or_none)
        row = await OxydeOAuthClient.objects.get(id=CIMD_URL)
        assert json.loads(row.redirect_uris) == ["https://app.example.org/callback"]

    @pytest.mark.parametrize("client_id", ["http://app.example.org/meta", "https://app.example.org"])
    async def test_unfetchable_client_id(self, db, oauth_settings, client_id):
        with pytest.raises(OAuthClientError) as refused:
            await OAuthClientService().resolve(client_id, source_ip=None)
        assert refused.value.error == "invalid_client"

    @pytest.mark.parametrize("client_id", [None, "", "some-client", "dcr_missing", "builtin:claude"])
    async def test_unknown_client_id(self, db, oauth_settings, client_id):
        with pytest.raises(OAuthClientError) as refused:
            await OAuthClientService().resolve(client_id, source_ip=None)
        assert refused.value.error == "invalid_client"

    async def test_identity(self, db, oauth_settings, monkeypatch):
        monkeypatch.setattr(cimd, "fetch", _FakeFetch(document=_doc(
            CLAUDE_CODE, client_name="anything",
            redirect_uris=["http://localhost/callback", "http://127.0.0.1/callback"],
        )))
        service = OAuthClientService()
        identity = service.identity(await service.resolve(CLAUDE_CODE, source_ip=None))
        assert (identity.name, identity.trust, identity.host) == ("Claude Code", "recognized", "claude.ai")
        assert identity.loopback_only is True
        assert identity.redirect_hosts == ("localhost", "127.0.0.1")

        monkeypatch.setattr(cimd, "fetch", _FakeFetch())
        other = service.identity(await service.resolve(CIMD_URL, source_ip=None))
        assert (other.name, other.trust, other.host, other.loopback_only) == (
            "Example App", "cimd", "app.example.org", False,
        )


class TestCIMDLimits:
    """CHT-1572 / review S4: an unauthenticated authorize names the URL,
    so new fetches are rate limited per address and never-authorized
    CIMD rows are capped."""

    async def test_new_fetches_are_rate_limited_per_address(self, db, oauth_settings, monkeypatch):
        oauth_settings(oauth_cimd_fetch_max_per_ip_per_hour=2)
        fake = _FakeFetch()
        monkeypatch.setattr(cimd, "fetch", fake)
        service = OAuthClientService()
        for n in range(2):
            await service.resolve(f"https://app.example.org/{n}", source_ip="198.51.100.7")
        with pytest.raises(OAuthClientError) as refused:
            await service.resolve("https://app.example.org/2", source_ip="198.51.100.7")
        assert (refused.value.status_code, refused.value.error) == (429, "too_many_requests")
        assert fake.calls == 2
        # A cached client costs nothing; another address has its own budget.
        await service.resolve("https://app.example.org/0", source_ip="198.51.100.7")
        await service.resolve("https://app.example.org/2", source_ip="198.51.100.8")
        assert fake.calls == 3

    async def test_failed_fetches_count_too(self, db, oauth_settings, monkeypatch):
        oauth_settings(oauth_cimd_fetch_max_per_ip_per_hour=1)
        monkeypatch.setattr(cimd, "fetch", _FakeFetch(error="nope"))
        service = OAuthClientService()
        with pytest.raises(OAuthClientError, match="nope"):
            await service.resolve(CIMD_URL, source_ip="198.51.100.7")
        with pytest.raises(OAuthClientError) as refused:
            await service.resolve(CIMD_URL, source_ip="198.51.100.7")
        assert refused.value.status_code == 429

    async def test_ipv6_addresses_share_their_64(self, db, oauth_settings, monkeypatch):
        oauth_settings(oauth_cimd_fetch_max_per_ip_per_hour=1)
        monkeypatch.setattr(cimd, "fetch", _FakeFetch())
        service = OAuthClientService()
        await service.resolve("https://app.example.org/a", source_ip="2001:db8:1:2::1")
        with pytest.raises(OAuthClientError):
            await service.resolve("https://app.example.org/b", source_ip="2001:db8:1:2:ffff::9")
        await service.resolve("https://app.example.org/b", source_ip="2001:db8:1:3::1")

    async def test_never_authorized_rows_are_capped(self, db, oauth_settings, monkeypatch):
        oauth_settings(oauth_cimd_max_pending_clients=2)
        monkeypatch.setattr(cimd, "fetch", _FakeFetch())
        service = OAuthClientService()
        await service.resolve("https://app.example.org/a", source_ip=None)
        await service.resolve("https://app.example.org/b", source_ip=None)
        with pytest.raises(OAuthClientError) as refused:
            await service.resolve("https://app.example.org/c", source_ip=None)
        assert refused.value.status_code == 429
        # Rolled back, not left behind.
        assert await OxydeOAuthClient.objects.filter(id="https://app.example.org/c").count() == 0
        # A known client is never crowded out; an authorized one frees a slot.
        await service.resolve(CLAUDE_CODE, source_ip=None)
        await service.mark_authorized("https://app.example.org/a")
        await service.resolve("https://app.example.org/c", source_ip=None)

    async def test_the_cap_holds_under_concurrency(self, db, oauth_settings, monkeypatch):
        oauth_settings(oauth_cimd_max_pending_clients=3)
        monkeypatch.setattr(cimd, "fetch", _FakeFetch())
        service = OAuthClientService()
        results = await asyncio.gather(
            *(service.resolve(f"https://app.example.org/{n}", source_ip=None) for n in range(8)), return_exceptions=True,
        )
        assert sum(not isinstance(r, Exception) for r in results) == 3
        assert all(isinstance(r, OAuthClientError) for r in results if isinstance(r, Exception))
        assert await OxydeOAuthClient.objects.count() == 3


class TestAddressBucket:
    @pytest.mark.parametrize("ip,bucket", [
        ("198.51.100.1", "198.51.100.1"),
        ("::ffff:198.51.100.1", "198.51.100.1"),
        ("2001:db8:1:2:3:4:5:6", "2001:db8:1:2::/64"),
        ("2001:db8:1:2::1%eth0", "2001:db8:1:2::/64"),
        ("testclient", "testclient"),
    ])
    def test_bucket(self, ip, bucket):
        assert ratelimit.address_bucket(ip) == bucket

    def test_dcr_hash_is_per_bucket(self, oauth_settings):
        assert hash_ip("2001:db8::1") == hash_ip("2001:db8::ffff:1")
        assert hash_ip("2001:db8::1") != hash_ip("2001:db8:0:1::1")
        assert hash_ip("::ffff:198.51.100.1") == hash_ip("198.51.100.1")

    def test_limiter_slides_and_forgets_old_keys(self):
        limiter = ratelimit.SlidingWindowLimiter(60, max_keys=2)
        assert limiter.allow("a", 1, now=0)
        assert not limiter.allow("a", 1, now=30)
        assert limiter.allow("a", 1, now=61)
        limiter.allow("b", 1, now=61)
        limiter.allow("c", 1, now=61)
        assert len(limiter._hits) == 2 and "a" not in limiter._hits


# --- DCR -----------------------------------------------------------------


def _registration(**overrides):
    body = {"client_name": "MCP Inspector", "redirect_uris": ["http://localhost:6274/oauth/callback"]}
    body.update(overrides)
    return body


class TestRegisterEndpoint:
    async def test_registers_a_public_client(self, client, oauth_settings):
        response = await client.post("/oauth/register", json=_registration(
            logo_uri="https://evil.example/logo.png", client_uri="https://evil.example", contacts=["x"],
        ))
        assert response.status_code == 201, response.text
        assert response.headers["cache-control"] == "no-store"
        body = response.json()
        assert body["client_id"].startswith("dcr_")
        assert body["client_name"] == "MCP Inspector"
        assert body["redirect_uris"] == ["http://localhost:6274/oauth/callback"]
        assert body["token_endpoint_auth_method"] == "none"
        assert body["grant_types"] == ["authorization_code", "refresh_token"]
        assert body["response_types"] == ["code"]
        assert "client_secret" not in body
        assert "logo_uri" not in body and "client_uri" not in body
        row = await OxydeOAuthClient.objects.get(id=body["client_id"])
        assert row.registration == OAuthClientRegistration.DCR
        assert "evil.example" not in row.metadata_json
        assert row.registered_ip_hash and "127.0.0.1" not in row.registered_ip_hash
        resolved = await OAuthClientService().resolve(body["client_id"], source_ip=None)
        identity = OAuthClientService().identity(resolved)
        assert (identity.trust, identity.host, identity.name) == ("unverified", None, "MCP Inspector")

    async def test_confidential_client_gets_a_hashed_secret(self, client, oauth_settings):
        response = await client.post("/oauth/register", json=_registration(
            token_endpoint_auth_method="client_secret_post", grant_types=["authorization_code"],
        ))
        assert response.status_code == 201, response.text
        body = response.json()
        assert body["client_secret"].startswith("ccs_")
        assert body["client_secret_expires_at"] == 0
        assert body["grant_types"] == ["authorization_code"]
        row = await OxydeOAuthClient.objects.get(id=body["client_id"])
        assert row.client_secret_hash == hash_client_secret(body["client_secret"])
        assert body["client_secret"] not in row.metadata_json

    async def test_long_or_odd_names_are_cleaned(self, client, oauth_settings):
        response = await client.post("/oauth/register", json=_registration(client_name="A‮\n  B" + "x" * 100))
        assert response.status_code == 201
        assert response.json()["client_name"] == ("A B" + "x" * 100)[:64]

    async def test_a_known_redirect_does_not_make_a_dcr_client_recognized(self, client, oauth_settings):
        response = await client.post("/oauth/register", json=_registration(
            client_name="Claude", redirect_uris=["https://claude.ai/api/mcp/auth_callback"],
        ))
        row = await OAuthClientService().resolve(response.json()["client_id"], source_ip=None)
        assert OAuthClientService().identity(row).trust == "unverified"

    @pytest.mark.parametrize("body,error", [
        ({"client_name": "x"}, "invalid_redirect_uri"),
        (_registration(redirect_uris=[]), "invalid_redirect_uri"),
        (_registration(redirect_uris="https://a.example/cb"), "invalid_redirect_uri"),
        (_registration(redirect_uris=["http://app.example/cb"]), "invalid_redirect_uri"),
        (_registration(redirect_uris=["https://a.example/cb#x"]), "invalid_redirect_uri"),
        (_registration(redirect_uris=["https://*.example/cb"]), "invalid_redirect_uri"),
        (_registration(redirect_uris=[f"https://a.example/{i}" for i in range(6)]), "invalid_redirect_uri"),
        (_registration(token_endpoint_auth_method="private_key_jwt"), "invalid_client_metadata"),
        (_registration(token_endpoint_auth_method="client_secret_basic"), "invalid_client_metadata"),
        (_registration(grant_types=["implicit"]), "invalid_client_metadata"),
        (_registration(grant_types=["refresh_token"]), "invalid_client_metadata"),
        (_registration(grant_types=[]), "invalid_client_metadata"),
        (_registration(response_types=["token"]), "invalid_client_metadata"),
        (_registration(scope=["chaotic:write"]), "invalid_client_metadata"),
        (_registration(client_name=7), "invalid_client_metadata"),
    ])
    async def test_invalid_metadata(self, client, oauth_settings, body, error):
        response = await client.post("/oauth/register", json=body)
        assert response.status_code == 400, response.text
        assert response.json()["error"] == error
        assert response.json()["error_description"]
        assert response.headers["cache-control"] == "no-store"
        assert await OxydeOAuthClient.objects.count() == 0

    async def test_oversized_declared_length_is_refused_unread(self, client, oauth_settings):
        response = await client.post(
            "/oauth/register", content=json.dumps(_registration()),
            headers={"Content-Type": "application/json", "Content-Length": str(17 * 1024)},
        )
        assert response.status_code == 400
        assert "too large" in response.json()["error_description"]

    async def test_oversized_chunked_body_is_refused(self, client, oauth_settings):
        async def chunks():
            yield b'{"redirect_uris": ["https://a.example/cb"], "x": "'
            for _ in range(20):
                yield b"y" * 1024
            yield b'"}'
        response = await client.post("/oauth/register", content=chunks(),
                                     headers={"Content-Type": "application/json"})
        assert response.status_code == 400
        assert "too large" in response.json()["error_description"]

    @pytest.mark.parametrize("content", [b"not json", b"[1]", b"\xff\xfe", b"{" + b" " * (17 * 1024) + b"}"])
    async def test_malformed_body(self, client, oauth_settings, content):
        response = await client.post("/oauth/register", content=content,
                                     headers={"Content-Type": "application/json"})
        assert response.status_code == 400
        assert response.json()["error"] == "invalid_client_metadata"

    async def test_404_when_oauth_is_off(self, client, oauth_settings):
        oauth_settings(enabled=False)
        response = await client.post("/oauth/register", json=_registration())
        assert response.status_code == 404
        assert await OxydeOAuthClient.objects.count() == 0

    async def test_404_when_dcr_is_off(self, client, oauth_settings):
        oauth_settings(dcr=False)
        response = await client.post("/oauth/register", json=_registration())
        assert response.status_code == 404

    async def test_per_ip_rate_limit(self, client, oauth_settings):
        oauth_settings(oauth_dcr_max_per_ip_per_hour=2)
        for _ in range(2):
            assert (await client.post("/oauth/register", json=_registration())).status_code == 201
        refused = await client.post("/oauth/register", json=_registration())
        assert refused.status_code == 429
        assert refused.json()["error"] == "too_many_requests"
        # An hour later the window has moved.
        await OxydeOAuthClient.objects.filter(registration=OAuthClientRegistration.DCR).update(
            created_at=datetime.now(timezone.utc) - timedelta(minutes=61),
        )
        assert (await client.post("/oauth/register", json=_registration())).status_code == 201

    async def test_rate_limit_is_per_address(self, db, oauth_settings):
        oauth_settings(oauth_dcr_max_per_ip_per_hour=1)
        service = OAuthClientService()
        await service.register(_registration(), source_ip="198.51.100.1")
        await service.register(_registration(), source_ip="198.51.100.2")
        with pytest.raises(OAuthClientError):
            await service.register(_registration(), source_ip="198.51.100.1")

    async def test_ipv6_rate_limit_is_per_64(self, db, oauth_settings):
        oauth_settings(oauth_dcr_max_per_ip_per_hour=1)
        service = OAuthClientService()
        await service.register(_registration(), source_ip="2001:db8:1:2::1")
        with pytest.raises(OAuthClientError):
            await service.register(_registration(), source_ip="2001:db8:1:2::2")
        await service.register(_registration(), source_ip="2001:db8:1:3::1")

    async def test_caps_hold_under_concurrency(self, db, oauth_settings):
        """Insert-then-count in one transaction: a parallel burst can't
        all read "one under the limit" (review S4)."""
        oauth_settings(oauth_dcr_max_per_ip_per_hour=3)
        service = OAuthClientService()
        results = await asyncio.gather(
            *(service.register(_registration(), source_ip="198.51.100.1") for _ in range(8)),
            return_exceptions=True,
        )
        assert sum(not isinstance(r, Exception) for r in results) == 3
        assert all(isinstance(r, OAuthClientError) for r in results if isinstance(r, Exception))
        assert await OxydeOAuthClient.objects.count() == 3

    async def test_global_cap_counts_only_never_authorized_clients(self, db, oauth_settings):
        oauth_settings(oauth_dcr_max_pending_clients=2, oauth_dcr_max_per_ip_per_hour=100)
        service = OAuthClientService()
        first, _ = await service.register(_registration(), source_ip="198.51.100.1")
        await service.register(_registration(), source_ip="198.51.100.2")
        with pytest.raises(OAuthClientError) as refused:
            await service.register(_registration(), source_ip="198.51.100.3")
        assert refused.value.status_code == 429
        await service.mark_authorized(first.id)
        await service.register(_registration(), source_ip="198.51.100.3")


class TestGarbageCollection:
    async def test_unused_clients_are_deleted_after_24_hours(self, db, oauth_settings):
        service = OAuthClientService()
        stale, _ = await service.register(_registration(), source_ip="198.51.100.1")
        used, _ = await service.register(_registration(), source_ip="198.51.100.2")
        fresh, _ = await service.register(_registration(), source_ip="198.51.100.3")
        await service.mark_authorized(used.id)
        day_ago = datetime.now(timezone.utc) - timedelta(hours=24, seconds=1)
        for row in (stale, used):
            await OxydeOAuthClient.objects.filter(id=row.id).update(created_at=day_ago)

        # Refused at 24 hours, before the sweep reaches it...
        with pytest.raises(OAuthClientError):
            await service.resolve(stale.id, source_ip=None)
        assert (await service.resolve(used.id, source_ip=None)).id == used.id
        # ...but kept for a grace period, so a consent begun just before
        # the deadline doesn't lose its request to the cascade (N6).
        assert await service.gc_unused() == 0
        await OxydeOAuthClient.objects.filter(id=stale.id).update(
            created_at=datetime.now(timezone.utc) - timedelta(hours=24, minutes=16),
        )

        assert await service.gc_unused() == 1
        remaining = {r.id for r in await OxydeOAuthClient.objects.all()}
        assert remaining == {used.id, fresh.id}

    async def test_registration_sweeps_first(self, db, oauth_settings):
        oauth_settings(oauth_dcr_max_pending_clients=1)
        service = OAuthClientService()
        old, _ = await service.register(_registration(), source_ip="198.51.100.1")
        await OxydeOAuthClient.objects.filter(id=old.id).update(
            created_at=datetime.now(timezone.utc) - timedelta(days=2),
        )
        await service.register(_registration(), source_ip="198.51.100.2")
        assert await OxydeOAuthClient.objects.filter(id=old.id).count() == 0

    async def test_unused_cimd_clients_go_once_their_cache_is_long_expired(self, db, oauth_settings, monkeypatch):
        """Any unauthenticated authorize can create a CIMD row by naming a
        new URL, so unused ones are collected too, but never one whose
        cache is current (a consent may be in progress) or that ever
        authorized."""
        monkeypatch.setattr(cimd, "fetch", _FakeFetch())
        service = OAuthClientService()
        await service.resolve(CIMD_URL, source_ip=None)
        await service.resolve(CLAUDE_CODE, source_ip=None)
        now = datetime.now(timezone.utc)
        await OxydeOAuthClient.objects.filter(id=CIMD_URL).update(created_at=now - timedelta(days=30))
        assert await service.gc_unused() == 0  # cache still current
        await OxydeOAuthClient.objects.filter(id=CIMD_URL).update(cache_expires_at=now - timedelta(minutes=10))
        assert await service.gc_unused() == 0  # within the grace
        await OxydeOAuthClient.objects.filter(id=CIMD_URL).update(cache_expires_at=now - timedelta(minutes=16))
        await OxydeOAuthClient.objects.filter(id=CLAUDE_CODE).update(
            created_at=now - timedelta(days=30), cache_expires_at=now - timedelta(days=1),
        )
        await service.mark_authorized(CLAUDE_CODE)
        assert await service.gc_unused() == 1
        assert {r.id for r in await OxydeOAuthClient.objects.all()} == {CLAUDE_CODE}

    async def test_creating_a_cimd_row_sweeps_first(self, db, oauth_settings, monkeypatch):
        monkeypatch.setattr(cimd, "fetch", _FakeFetch())
        service = OAuthClientService()
        stale, _ = await service.register(_registration(), source_ip="198.51.100.1")
        await OxydeOAuthClient.objects.filter(id=stale.id).update(
            created_at=datetime.now(timezone.utc) - timedelta(days=2),
        )
        await service.resolve(CIMD_URL, source_ip=None)
        assert await OxydeOAuthClient.objects.filter(id=stale.id).count() == 0


# --- CHT-1564: no cookie or session auth on the public OAuth endpoints ----


# Helpers the source-level guard below does not descend into, each pinned
# by its own test.
_SCHEME_ONLY_HELPERS = {"_refuse_basic_auth"}


class TestNoAmbientAuth:
    def _public_post_routes(self):
        from fastapi.routing import APIRoute, iter_route_contexts

        from app.main import app
        from app.oauth.cors import PUBLIC_OAUTH_METHODS

        posts = {path for path, methods in PUBLIC_OAUTH_METHODS.items() if "POST" in methods}
        return [
            rc.original_route for rc in iter_route_contexts(app.routes)
            if isinstance(rc.original_route, APIRoute) and rc.path in posts
        ]

    def test_public_oauth_posts_take_no_cookie_or_bearer(self):
        """/oauth/token, /oauth/register and /oauth/revoke authenticate
        nothing ambient: no cookie parameter, and no dependency on the
        Authorization header (get_current_user, HTTPBearer). Covers each
        endpoint as it lands (register now; token, revoke with CHT-1520)."""
        from fastapi.security.base import SecurityBase

        from app.api.deps import get_current_user, get_auth_method

        routes = self._public_post_routes()
        assert "/oauth/register" in {r.path for r in routes}

        def walk(dependant):
            yield dependant
            for sub in dependant.dependencies:
                yield from walk(sub)

        for route in routes:
            for dep in walk(route.dependant):
                assert dep.cookie_params == [], route.path
                assert dep.call not in (get_current_user, get_auth_method), route.path
                assert not isinstance(dep.call, SecurityBase), route.path

    def test_basic_scheme_helper_reads_only_the_scheme(self):
        """The one allowed look at the Authorization header (CHT-1520,
        PR #345 review): the token and revoke endpoints refuse an HTTP
        Basic attempt with a pointer to client_secret_post. The helper
        reads the scheme word only and returns nothing, so no credential
        can come out of it."""
        from app.api import oauth as api_oauth

        def body(source):
            function = ast.parse(textwrap.dedent(source)).body[0]
            statements = function.body
            if statements and isinstance(statements[0], ast.Expr) and isinstance(statements[0].value, ast.Constant):
                statements = statements[1:]  # the docstring may change freely
            return [ast.dump(s) for s in statements]

        # The helper's exact code, docstring aside. Any edit, such as
        # decoding the credentials or branching on them, fails here and has
        # to be made deliberately in this test too (PR #345 re-review, B).
        pinned = """
def _refuse_basic_auth(request):
    scheme = request.headers.get("Authorization", "").split(" ", 1)[0]
    if scheme.lower() == "basic":
        raise OAuthHTTPError(
            400, "invalid_request",
            "HTTP Basic client authentication is not supported; send client_id and client_secret "
            "in the form body (client_secret_post)",
        )
"""
        assert body(inspect.getsource(api_oauth._refuse_basic_auth)) == body(pinned)

    def test_public_oauth_post_handlers_read_no_cookie_or_authorization(self):
        """Source-level: a handler taking a raw ``Request`` has no
        dependency to inspect, so read its code (and the module helpers
        it calls) for ``.cookies`` or an ``authorization`` header name."""
        for route in self._public_post_routes():
            endpoint = inspect.unwrap(route.endpoint)
            module = inspect.getmodule(endpoint)
            tree = ast.parse(textwrap.dedent(inspect.getsource(module)))
            functions = {
                node.name: node for node in ast.walk(tree)
                if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef))
            }
            todo, seen = [endpoint.__name__], set()
            while todo:
                name = todo.pop()
                if name in _SCHEME_ONLY_HELPERS:
                    continue  # pinned by test_basic_scheme_helper_reads_only_the_scheme
                if name in seen or name not in functions:
                    continue
                seen.add(name)
                for node in ast.walk(functions[name]):
                    if isinstance(node, ast.Attribute):
                        assert node.attr not in ("cookies", "auth", "user"), (route.path, name, node.attr)
                    if isinstance(node, ast.Constant) and isinstance(node.value, (str, bytes)):
                        value = node.value.decode("latin-1") if isinstance(node.value, bytes) else node.value
                        assert value.lower() not in ("authorization", "cookie"), (route.path, name)
                    if isinstance(node, ast.Name):
                        todo.append(node.id)
            assert endpoint.__name__ in seen

    async def test_register_never_consults_a_credential(self, client, oauth_settings, auth_headers, monkeypatch):
        """Behavioural: no credential check runs, not even one whose
        failure is swallowed (the recorded calls stay empty; PR #402
        review M1), and a request carrying a valid login as a bearer and
        a cookie gets the same answer as an anonymous one."""
        from .oauth_tokens import credential_tripwire

        oauth_settings(oauth_dcr_max_per_ip_per_hour=100)
        calls = credential_tripwire(monkeypatch)

        with_login = await client.post(
            "/oauth/register", json=_registration(),
            headers={**auth_headers, "Cookie": f"chaotic_token={auth_headers['Authorization'][7:]}"},
        )
        anonymous = await client.post("/oauth/register", json=_registration())
        assert calls == []
        assert with_login.status_code == anonymous.status_code == 201, with_login.text

        def shape(body):
            return {k: v for k, v in body.items() if k not in ("client_id", "client_id_issued_at")}
        assert shape(with_login.json()) == shape(anonymous.json())
        rows = [await OxydeOAuthClient.objects.get(id=r.json()["client_id"]) for r in (with_login, anonymous)]
        assert all(r.last_authorized_at is None for r in rows)

    async def test_register_ignores_a_session_and_a_cookie(self, client, oauth_settings, auth_headers):
        response = await client.post(
            "/oauth/register", json=_registration(),
            headers={**auth_headers, "Cookie": "session=abc; chaotic_token=xyz"},
        )
        assert response.status_code == 201
        row = await OxydeOAuthClient.objects.get(id=response.json()["client_id"])
        # Nothing about the caller's login was recorded on the client.
        assert row.last_authorized_at is None
