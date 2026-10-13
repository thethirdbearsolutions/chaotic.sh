"""Client address behind a trusted reverse proxy (CHT-1586).

The OAuth per-address limits key on ``request.client.host``. Behind a
reverse proxy that is the proxy's address unless the proxy's
X-Forwarded-For is believed, and it must be believed only from the
proxies listed in FORWARDED_ALLOW_IPS, never from any sender.
"""
from pathlib import Path

import pytest
from httpx import ASGITransport, AsyncClient
from pydantic import ValidationError
from unittest.mock import patch
from uvicorn.middleware.proxy_headers import ProxyHeadersMiddleware

from app.config import Settings, get_settings, parse_trusted_proxies
from app.oauth import ratelimit

REPO_ROOT = Path(__file__).resolve().parents[2]


@pytest.fixture
def dcr_limit_one(monkeypatch):
    monkeypatch.setenv("OAUTH_ENABLED", "true")
    monkeypatch.setenv("APP_BASE_URL", "https://tracker.example.com")
    monkeypatch.setenv("OAUTH_DCR_MAX_PER_IP_PER_HOUR", "1")
    get_settings.cache_clear()
    ratelimit.authorize_requests.clear()
    yield
    get_settings.cache_clear()


def _registration():
    return {"client_name": "MCP Inspector", "redirect_uris": ["http://localhost:6274/oauth/callback"]}


async def _register(client, forwarded_for=None):
    headers = {"X-Forwarded-For": forwarded_for} if forwarded_for else {}
    return await client.post("/oauth/register", json=_registration(), headers=headers)


@pytest.fixture
async def client_from(db):
    """A client whose socket address is the given one (the app's real
    middleware stack, built with the default FORWARDED_ALLOW_IPS)."""
    from app.main import app

    async def noop():
        return None

    clients = []

    async def _make(address):
        transport = ASGITransport(app=app, client=(address, 4321))
        ac = AsyncClient(transport=transport, base_url="http://test")
        clients.append(ac)
        return ac

    with patch("app.main.init_oxyde", side_effect=noop), patch("app.main.close_oxyde", side_effect=noop):
        yield _make
        for ac in clients:
            await ac.aclose()


class TestForwardedFor:
    @pytest.mark.parametrize("proxy", ["127.0.0.1", "::1"])
    async def test_a_loopback_proxy_is_believed(self, client_from, dcr_limit_one, proxy):
        """Behind the recommended same-machine proxy each client has its
        own limit, not one shared by the whole server."""
        client = await client_from(proxy)
        assert (await _register(client, "198.51.100.1")).status_code == 201
        assert (await _register(client, "198.51.100.2")).status_code == 201
        assert (await _register(client, "198.51.100.1")).status_code == 429

    async def test_the_client_cannot_spoof_through_the_proxy(self, client_from, dcr_limit_one):
        """The proxy appends the address it saw; a value the client sent
        ahead of it is not what the limit counts."""
        client = await client_from("127.0.0.1")
        assert (await _register(client, "10.9.9.9, 198.51.100.1")).status_code == 201
        assert (await _register(client, "10.9.9.8, 198.51.100.1")).status_code == 429

    async def test_an_untrusted_sender_is_not_believed(self, client_from, dcr_limit_one):
        """A direct client cannot dodge its limit by sending its own
        X-Forwarded-For."""
        client = await client_from("203.0.113.9")
        assert (await _register(client, "198.51.100.1")).status_code == 201
        assert (await _register(client, "198.51.100.2")).status_code == 429

    def test_installed_outermost_with_the_setting(self):
        from app.main import app

        outermost = app.user_middleware[0]
        assert outermost.cls is ProxyHeadersMiddleware
        assert outermost.kwargs["trusted_hosts"] == get_settings().trusted_proxies

    def test_serve_prod_leaves_proxy_headers_to_the_app(self):
        """uvicorn would otherwise apply its own FORWARDED_ALLOW_IPS,
        without this module's validation."""
        justfile = (REPO_ROOT / "justfile").read_text()
        for recipe in ("serve", "serve-prod"):
            body = justfile.split(f"\n{recipe}:\n", 1)[1].split("\n\n", 1)[0]
            assert "--no-proxy-headers" in body, recipe


class TestSetting:
    def test_default_trusts_loopback_only(self):
        assert Settings().trusted_proxies == ["127.0.0.1", "::1"]

    def test_addresses_and_networks(self):
        settings = Settings(forwarded_allow_ips=" 10.0.0.5, 192.168.0.0/16 ,fd00::/8,, ")
        assert settings.trusted_proxies == ["10.0.0.5", "192.168.0.0/16", "fd00::/8"]

    def test_empty_trusts_nobody(self):
        assert Settings(forwarded_allow_ips="").trusted_proxies == []

    @pytest.mark.parametrize(
        "value, why",
        [
            ("*", "must not be"),
            ("127.0.0.1,*", "must not be"),
            ("0.0.0.0/0", "covers every address"),
            ("::/0", "covers every address"),
            ("proxy.internal", "not an IP address"),
            ("10.0.0.1/8", "not an IP address"),  # host bits set: a typo, not a network
            ("10.0.0.0/33", "not an IP address"),
        ],
    )
    def test_refused(self, value, why):
        with pytest.raises(ValidationError, match=why):
            Settings(forwarded_allow_ips=value)
        with pytest.raises(ValueError, match=why):
            parse_trusted_proxies(value)

    def test_read_from_the_environment(self, monkeypatch):
        monkeypatch.setenv("FORWARDED_ALLOW_IPS", "10.1.2.3")
        assert Settings().trusted_proxies == ["10.1.2.3"]
