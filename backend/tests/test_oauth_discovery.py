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
RESOURCE_SCOPES = ["chaotic:write", "chaotic:worker", "chaotic:triage", "chaotic:read"]
AS_SCOPES = RESOURCE_SCOPES + ["offline_access"]
DOCS = "https://github.com/thethirdbearsolutions/chaotic.sh/blob/main/docs/agents.md"


@pytest.fixture
def oauth_settings(monkeypatch):
    """Set OAUTH_ENABLED / APP_BASE_URL for one test (get_settings is
    lru_cached; clear around the mutation)."""
    def _set(enabled: bool, base_url: str = "https://tracker.example.com", dcr: bool = True):
        monkeypatch.setenv("OAUTH_ENABLED", "true" if enabled else "false")
        monkeypatch.setenv("APP_BASE_URL", base_url)
        monkeypatch.setenv("OAUTH_DCR_ENABLED", "true" if dcr else "false")
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
    async def test_document(self, client, oauth_settings):
        oauth_settings(True)
        resp = await client.get(PRM_PATHS[0])
        assert resp.status_code == 200
        assert resp.headers["content-type"] == "application/json"
        assert resp.headers["cache-control"] == "no-store"
        assert resp.json() == {
            "resource": "https://tracker.example.com/mcp",
            "authorization_servers": ["https://tracker.example.com"],
            "scopes_supported": RESOURCE_SCOPES,
            "bearer_methods_supported": ["header"],
            "resource_name": "Chaotic",
            "resource_documentation": DOCS,
        }

    async def test_root_document_names_the_origin(self, client, oauth_settings):
        # RFC 9728 §3.3: resource is the identifier the well-known URL was
        # derived from, which for the root form is the origin.
        oauth_settings(True)
        body = (await client.get(PRM_PATHS[1])).json()
        assert body["resource"] == "https://tracker.example.com"
        assert body["authorization_servers"] == ["https://tracker.example.com"]
        assert body["scopes_supported"] == RESOURCE_SCOPES

    async def test_no_offline_access(self, client, oauth_settings):
        # MCP 2026-07-28 "Refresh Tokens": not a resource requirement.
        oauth_settings(True)
        for path in PRM_PATHS:
            assert "offline_access" not in (await client.get(path)).json()["scopes_supported"]

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
            "scopes_supported": AS_SCOPES,
            "response_types_supported": ["code"],
            "grant_types_supported": ["authorization_code", "refresh_token"],
            "code_challenge_methods_supported": ["S256"],
            "token_endpoint_auth_methods_supported": ["none", "client_secret_post"],
            "revocation_endpoint_auth_methods_supported": ["none", "client_secret_post"],
            "client_id_metadata_document_supported": True,
            "authorization_response_iss_parameter_supported": True,
            "service_documentation": DOCS,
        }
        assert resp.headers["cache-control"] == "no-store"

    async def test_registration_endpoint_only_with_dcr(self, client, oauth_settings):
        oauth_settings(True, dcr=False)
        body = (await client.get(ASM_PATH)).json()
        assert "registration_endpoint" not in body
        assert body["client_id_metadata_document_supported"] is True

    def test_dcr_on_by_default(self, monkeypatch):
        monkeypatch.delenv("OAUTH_DCR_ENABLED", raising=False)
        assert Settings(_env_file=None).oauth_dcr_enabled is True

    @pytest.mark.parametrize("base_url", [
        "https://tracker.example.com",
        "https://tracker.example.com/",
        "https://tracker.example.com:8443",
        "http://localhost:24267",
        "http://[::1]:24267",
        "https://xn--r8jz45g.jp",
    ])
    async def test_issuer_is_byte_identical_to_settings(self, client, oauth_settings, base_url):
        # The invariant O3's RFC 9207 `iss` and O4's resource check rely on.
        oauth_settings(True, base_url)
        issuer = get_settings().oauth_issuer
        asm = (await client.get(ASM_PATH)).json()
        prm = (await client.get(PRM_PATHS[0])).json()
        assert asm["issuer"] == issuer
        assert prm["authorization_servers"] == [issuer]
        assert prm["resource"] == f"{issuer}/mcp"

    async def test_no_openid(self, client, oauth_settings):
        # ChatGPT requests every advertised OIDC scope (design §1).
        oauth_settings(True)
        body = (await client.get(ASM_PATH)).json()
        assert "openid" not in body["scopes_supported"]
        assert "offline_access" in body["scopes_supported"]

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
        ("https://tracker.example.com:99999", "invalid port"),
        ("https://tracker.example.com:abc", "invalid port"),
        ("https://ho%2fst.example.com", "not a valid URL"),
        ("https://例え.jp", "not ASCII"),
        ("https://é.example", "not ASCII"),
        ("https://Tracker.Example.com", "use 'https://tracker.example.com'"),
        ("HTTPS://tracker.example.com", "use 'https://tracker.example.com'"),
        ("https://tracker.example.com:443", "use 'https://tracker.example.com'"),
        ("http://localhost:80", "use 'http://localhost'"),
        ("https://@tracker.example.com", "credentials"),
    ])
    def test_invalid_rejected_when_enabled(self, url, fragment):
        problem = oauth_issuer_problem(url)
        assert problem and fragment in problem
        with pytest.raises(ValidationError, match="OAUTH_ENABLED requires APP_BASE_URL"):
            Settings(_env_file=None, oauth_enabled=True, app_base_url=url)
