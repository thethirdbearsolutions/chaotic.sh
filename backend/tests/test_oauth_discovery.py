"""OAuth discovery documents (CHT-1517, design doc §2.1): RFC 9728
protected-resource metadata and RFC 8414 authorization-server metadata,
gated on OAUTH_ENABLED, with every URL derived from APP_BASE_URL.

The /mcp 401 challenge that points at these lives in
test_mcp_endpoint.py::TestOAuthChallenge, next to the rest of /mcp auth.
"""
import pytest
from pydantic import ValidationError

from app.config import Settings, get_settings, oauth_issuer_problem

PRM_PATHS = ["/.well-known/oauth-protected-resource/mcp", "/.well-known/oauth-protected-resource"]
ASM_PATH = "/.well-known/oauth-authorization-server"
ALL_PATHS = PRM_PATHS + [ASM_PATH]
SCOPES = ["chaotic:write", "chaotic:worker", "chaotic:triage", "chaotic:read", "offline_access"]


@pytest.fixture
def oauth_settings(monkeypatch):
    """Set OAUTH_ENABLED / APP_BASE_URL for one test (get_settings is
    lru_cached; clear around the mutation)."""
    def _set(enabled: bool, base_url: str = "https://tracker.example.com"):
        monkeypatch.setenv("OAUTH_ENABLED", "true" if enabled else "false")
        monkeypatch.setenv("APP_BASE_URL", base_url)
        get_settings.cache_clear()

    yield _set
    get_settings.cache_clear()


class TestDisabled:
    def test_default_is_off(self, monkeypatch):
        monkeypatch.delenv("OAUTH_ENABLED", raising=False)
        assert Settings(_env_file=None).oauth_enabled is False

    @pytest.mark.parametrize("path", ALL_PATHS)
    async def test_discovery_paths_404(self, client, oauth_settings, path):
        oauth_settings(False)
        resp = await client.get(path)
        assert resp.status_code == 404
        assert resp.json() == {"detail": "Not Found"}

    async def test_off_by_default_404(self, client, monkeypatch):
        monkeypatch.delenv("OAUTH_ENABLED", raising=False)
        get_settings.cache_clear()
        try:
            assert (await client.get(ASM_PATH)).status_code == 404
        finally:
            get_settings.cache_clear()

    def test_plain_http_base_url_is_fine_when_off(self):
        # The issuer checks apply only when OAuth is on: an existing
        # http-on-a-LAN-name install must keep starting.
        s = Settings(_env_file=None, oauth_enabled=False, app_base_url="http://tracker.lan:24267")
        assert s.oauth_enabled is False


class TestProtectedResourceMetadata:
    @pytest.mark.parametrize("path", PRM_PATHS)
    async def test_document(self, client, oauth_settings, path):
        oauth_settings(True)
        resp = await client.get(path)
        assert resp.status_code == 200
        assert resp.headers["content-type"] == "application/json"
        assert resp.json() == {
            "resource": "https://tracker.example.com/mcp",
            "authorization_servers": ["https://tracker.example.com"],
            "scopes_supported": SCOPES,
            "bearer_methods_supported": ["header"],
            "resource_name": "Chaotic",
            "resource_documentation": "https://github.com/thethirdbearsolutions/chaotic.sh/blob/main/docs/agents.md",
        }

    async def test_trailing_slash_base_url_is_trimmed(self, client, oauth_settings):
        oauth_settings(True, "https://tracker.example.com/")
        body = (await client.get(PRM_PATHS[0])).json()
        assert body["resource"] == "https://tracker.example.com/mcp"
        assert body["authorization_servers"] == ["https://tracker.example.com"]

    async def test_ignores_request_host(self, client, oauth_settings):
        oauth_settings(True)
        resp = await client.get(PRM_PATHS[0], headers={"Host": "evil.example.net"})
        assert resp.json()["authorization_servers"] == ["https://tracker.example.com"]

    async def test_loopback_http_issuer(self, client, oauth_settings):
        oauth_settings(True, "http://localhost:24267")
        body = (await client.get(PRM_PATHS[0])).json()
        assert body["resource"] == "http://localhost:24267/mcp"
        assert body["authorization_servers"] == ["http://localhost:24267"]


class TestAuthorizationServerMetadata:
    async def test_document(self, client, oauth_settings):
        oauth_settings(True)
        resp = await client.get(ASM_PATH)
        assert resp.status_code == 200
        base = "https://tracker.example.com"
        assert resp.json() == {
            "issuer": base,
            "authorization_endpoint": f"{base}/oauth/authorize",
            "token_endpoint": f"{base}/oauth/token",
            "registration_endpoint": f"{base}/oauth/register",
            "revocation_endpoint": f"{base}/oauth/revoke",
            "scopes_supported": SCOPES,
            "response_types_supported": ["code"],
            "grant_types_supported": ["authorization_code", "refresh_token"],
            "code_challenge_methods_supported": ["S256"],
            "token_endpoint_auth_methods_supported": ["none", "client_secret_post"],
            "revocation_endpoint_auth_methods_supported": ["none", "client_secret_post"],
            "client_id_metadata_document_supported": True,
            "authorization_response_iss_parameter_supported": True,
            "service_documentation": "https://github.com/thethirdbearsolutions/chaotic.sh/blob/main/docs/agents.md",
        }

    async def test_no_openid(self, client, oauth_settings):
        # ChatGPT requests every advertised OIDC scope (design §1).
        oauth_settings(True)
        body = (await client.get(ASM_PATH)).json()
        assert "openid" not in body["scopes_supported"]

    async def test_issuer_matches_prm_authorization_server(self, client, oauth_settings):
        # RFC 8414 §3.3: the client checks issuer == the URL it derived
        # the metadata location from, by exact string comparison.
        oauth_settings(True, "https://tracker.example.com/")
        prm = (await client.get(PRM_PATHS[0])).json()
        asm = (await client.get(ASM_PATH)).json()
        assert asm["issuer"] == prm["authorization_servers"][0] == "https://tracker.example.com"

    async def test_flag_is_read_per_request(self, client, oauth_settings):
        oauth_settings(True)
        assert (await client.get(ASM_PATH)).status_code == 200
        oauth_settings(False)
        assert (await client.get(ASM_PATH)).status_code == 404


class TestIssuerValidation:
    @pytest.mark.parametrize("url", [
        "https://tracker.example.com",
        "https://tracker.example.com/",
        "https://tracker.example.com:8443",
        "http://localhost:24267",
        "http://127.0.0.1:24267",
        "http://[::1]:24267",
    ])
    def test_valid(self, url):
        assert oauth_issuer_problem(url) is None
        assert Settings(_env_file=None, oauth_enabled=True, app_base_url=url).oauth_enabled

    @pytest.mark.parametrize("url,fragment", [
        ("http://tracker.example.com", "https"),
        ("http://tracker.lan:24267", "https"),
        ("https://tracker.example.com/chaotic", "bare origin"),
        ("https://tracker.example.com/?a=b", "bare origin"),
        ("https://tracker.example.com#x", "bare origin"),
        ("https://user:pw@tracker.example.com", "credentials"),
        ("ftp://tracker.example.com", "absolute http(s)"),
        ("tracker.example.com", "absolute http(s)"),
        ("", "absolute http(s)"),
        ('https://a"b.example.com', "quote"),
        ("https://a\\b.example.com", "quote"),
        ("https://tracker.example.com\r\nX: y", "control character"),
        ("https://tracker example.com", "whitespace"),
    ])
    def test_invalid_rejected_when_enabled(self, url, fragment):
        assert fragment in oauth_issuer_problem(url)
        with pytest.raises(ValidationError, match="OAUTH_ENABLED requires APP_BASE_URL"):
            Settings(_env_file=None, oauth_enabled=True, app_base_url=url)
