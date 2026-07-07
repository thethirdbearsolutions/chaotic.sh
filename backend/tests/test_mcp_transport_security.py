"""Unit tests for app.mcp_server.asgi._transport_security (PR #219 review,
finding 3): DNS-rebinding protection keyed to the operator's CORS_ORIGINS.

Tested at the settings-builder level rather than through a live /mcp
request: the SDK's TransportSecurityMiddleware behavior for a given
TransportSecuritySettings is the SDK's contract to keep, and rebuilding
the whole FastMCP instance per CORS configuration would re-test the SDK,
not our derivation logic.
"""
import pytest

from app.config import get_settings
from app.mcp_server.asgi import _transport_security


@pytest.fixture
def cors(monkeypatch):
    """Set CORS_ORIGINS for the duration of a test (get_settings is
    lru_cached; clear around the mutation).
    """
    def _set(value: str):
        monkeypatch.setenv("CORS_ORIGINS", value)
        get_settings.cache_clear()
        return _transport_security()

    yield _set
    get_settings.cache_clear()


def test_wildcard_default_disables_protection(cors):
    settings = cors("*")
    assert settings.enable_dns_rebinding_protection is False


def test_wildcard_anywhere_in_list_disables_protection(cors):
    settings = cors("https://tracker.example.com,*")
    assert settings.enable_dns_rebinding_protection is False


def test_explicit_origin_enables_protection(cors):
    settings = cors("https://tracker.example.com")
    assert settings.enable_dns_rebinding_protection is True
    assert settings.allowed_origins == ["https://tracker.example.com"]
    # Host derived from the origin's netloc; the :* variant covers a
    # nonstandard port.
    assert settings.allowed_hosts == ["tracker.example.com", "tracker.example.com:*"]


def test_origin_with_port_keeps_exact_host(cors):
    settings = cors("http://tracker.internal:8443")
    assert settings.enable_dns_rebinding_protection is True
    # Netloc already pins a port -- no :* wildcard added.
    assert settings.allowed_hosts == ["tracker.internal:8443"]


def test_multiple_origins(cors):
    settings = cors("https://a.example.com, https://b.example.com")
    assert settings.allowed_origins == ["https://a.example.com", "https://b.example.com"]
    assert "a.example.com" in settings.allowed_hosts
    assert "b.example.com" in settings.allowed_hosts
