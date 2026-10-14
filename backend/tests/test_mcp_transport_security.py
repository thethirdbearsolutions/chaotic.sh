"""Unit tests for app.mcp_server.asgi._transport_security (PR #219 review,
finding 3): DNS-rebinding protection keyed to the operator's CORS_ORIGINS.

Tested at the settings-builder level: the exhaustive derivation cases
live here. One live /mcp round-trip per mode (protection on: 421 on a
foreign Host, 200 on a matching one; protection off: any Host) lives in
test_mcp_endpoint.py::TestTransportSecurity so the settings object is
proven to actually reach the SDK's middleware in the mounted app.
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


@pytest.mark.parametrize("raw, expected", [
    ("*", ["*"]),
    ("https://a.example.com,", ["https://a.example.com"]),
    (" https://a.example.com , ,https://b.example.com ", ["https://a.example.com", "https://b.example.com"]),
    ("", []),
    (",", []),
    # CHT-1707: written by hand, in the form browsers send.
    ("https://A.example.com/", ["https://a.example.com"]),
    ("HTTPS://Tracker.Example.COM:8443//", ["https://tracker.example.com:8443"]),
    ("https://a.example.com:443,http://localhost:80", ["https://a.example.com", "http://localhost"]),
    ("http://[2001:DB8::1]:6274/", ["http://[2001:db8::1]:6274"]),
    ("chrome-extension://abcdef", ["chrome-extension://abcdef"]),
])
def test_cors_origin_list_is_the_one_parse(monkeypatch, raw, expected):
    """CORS_ORIGINS is parsed once, by Settings.cors_origin_list; a
    trailing comma or blank entry adds nothing (CHT-1563)."""
    monkeypatch.setenv("CORS_ORIGINS", raw)
    get_settings.cache_clear()
    try:
        assert get_settings().cors_origin_list == expected
    finally:
        get_settings.cache_clear()


@pytest.mark.parametrize("raw", [
    "https://tracker.example.com/path", "https://tracker.example.com?q", "https://tracker.example.com#f",
    "https://user:pw@tracker.example.com", "https://user@tracker.example.com", "tracker.example.com",
    "null", "https://tracker.example.com:99999", "https://a.example.com,https://b.example.com/x",
    "https://bücher.example", "https://a example.com", "https://a.example.com\thttps://b.example.com",
])
def test_a_value_that_is_not_an_origin_refuses_startup(raw):
    """Settings refuses to build, naming the entry, rather than guessing
    at an origin or dropping one (CHT-1707): dropping could empty the
    list, which turns the /mcp guard off."""
    from pydantic import ValidationError
    from app.config import Settings

    with pytest.raises(ValidationError, match="CORS_ORIGINS entry"):
        Settings(cors_origins=raw)


def test_a_hand_written_origin_reaches_the_guard_normalised(cors):
    settings = cors("https://Tracker.Example.com/")
    assert settings.allowed_origins == ["https://tracker.example.com"]
    assert "tracker.example.com" in settings.allowed_hosts


def test_trailing_comma_keeps_the_guard_on_the_same_origins(cors):
    settings = cors("https://tracker.example.com,")
    assert settings.enable_dns_rebinding_protection is True
    assert settings.allowed_origins == ["https://tracker.example.com"]


def test_the_cors_middleware_takes_the_same_list(monkeypatch):
    """main.py hands the CORS middleware Settings.cors_origin_list, the
    list the /mcp guard reads, not a parse of its own: a trailing comma
    adds no "" origin (CHT-1563)."""
    from app.main import _cors_kwargs, app, settings
    from app.oauth.cors import OAuthAwareCORS

    (cors_mw,) = [m for m in app.user_middleware if m.cls is OAuthAwareCORS]
    assert cors_mw.kwargs == _cors_kwargs(settings)

    monkeypatch.setenv("CORS_ORIGINS", "https://a.example.com,")
    get_settings.cache_clear()
    try:
        kwargs = _cors_kwargs(get_settings())
    finally:
        get_settings.cache_clear()
    assert kwargs["allow_origins"] == ["https://a.example.com"]
    assert kwargs["allow_credentials"] is True
