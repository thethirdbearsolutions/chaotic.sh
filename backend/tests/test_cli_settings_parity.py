"""The CLI's `chaotic system config` accepts only what this server accepts
(CHT-1592, PR #349 review finding 3).

`set` writes the service file while the server runs, so a value the CLI
accepts and the server refuses surfaces only at the next restart, and if
that restart is an upgrade, as a server that will not come back. The
CLI (cli/src/cli/server_settings.py, stdlib only) cannot import
app.config, so this pins the subset relation from the server's side:
over a grid of origins built from the forms that differ between a naive
check and pydantic's normalisation, everything the CLI accepts as an
OAuth APP_BASE_URL passes oauth_issuer_problem. Same for the .env
reading it reports on, against python-dotenv. And CORS_ORIGINS
(CHT-1707): the server normalises a hand-written origin to the very value
the CLI would have stored, or told the operator to write.
"""
import importlib.util
import io
import itertools
import re
import sys
from pathlib import Path

import pytest
from dotenv import dotenv_values

from app.config import normalise_cors_origin, oauth_issuer_problem

_PATH = Path(__file__).resolve().parents[2] / "cli" / "src" / "cli" / "server_settings.py"
_spec = importlib.util.spec_from_file_location("cli_server_settings", _PATH)
cli_settings = importlib.util.module_from_spec(_spec)
sys.modules[_spec.name] = cli_settings  # dataclasses look their module up there
_spec.loader.exec_module(cli_settings)

SCHEMES = ["https", "http", "HTTPS"]
HOSTS = [
    "example.com", "Example.com", "sub.example.com", "a-b.example.com", "a..b", "-a.example.com",
    "exa_mple.com", "example.com.", "ab--c.example.com", "xn--bcher-kva.example", "xn--zz", "XN--bcher-kva.example",
    "localhost", "127.0.0.1", "127.1", "010.0.0.1", "0x7f.0.0.1", "1234", "256.0.0.1", "1.2.3.4.5",
    "[::1]", "[0:0::1]", "[::ffff:127.0.0.1]", "[::FFFF:7f00:1]", "[::ffff:7f00:1]", "[2001:db8::1]",
    "[2001:0db8::1]", "[1:0:0:2:0:0:0:3]", "[1:0:0:2:0:0:3:4]", "[1:0:2:3:4:5:6:7]", "[::]", "[::1%eth0]",
    "%65xample.com", "exam%2Eple.com",
]
PORTS = ["", ":", ":0", ":1", ":80", ":443", ":8443", ":08443", ":65535", ":65536", ":+80", ": 80"]
TAILS = ["", "/", "//", "/path", "?q", "#f"]


def _cli_accepts_as_issuer(url: str) -> bool:
    value, problem = cli_settings.normalize("APP_BASE_URL", url)
    if problem:
        return False
    errors, _ = cli_settings.check({"settings": {"OAUTH_ENABLED": "true", "APP_BASE_URL": value}})
    return not errors


def test_cli_accepted_issuers_are_a_subset_of_the_servers():
    accepted = 0
    for scheme, host, port, tail in itertools.product(SCHEMES, HOSTS, PORTS, TAILS):
        url = f"{scheme}://{host}{port}{tail}"
        if not _cli_accepts_as_issuer(url):
            continue
        accepted += 1
        stored = cli_settings.normalize("APP_BASE_URL", url)[0]
        assert oauth_issuer_problem(stored) is None, (url, stored, oauth_issuer_problem(stored))
    assert accepted > 50  # the grid exercises acceptance, not just refusal


@pytest.mark.parametrize("url", [
    "https://chaotic.example.com", "https://chaotic.example.com:8443", "http://localhost:24267",
    "https://[2001:db8::1]:8443", "https://127.0.0.1",
])
def test_ordinary_issuers_are_accepted_by_both(url):
    assert _cli_accepts_as_issuer(url)
    assert oauth_issuer_problem(url) is None


def _server_origin(url: str) -> str | None:
    try:
        return normalise_cors_origin(url)
    except ValueError:
        return None


def test_cli_accepted_cors_origins_are_left_as_stored_by_the_server():
    """Every origin `config set CORS_ORIGINS` accepts, the server keeps
    exactly as the CLI stored it. Idempotence over the CLI's own output:
    it pins trailing-slash stripping, not the rules the CLI refuses on
    (capitals, a default port); the next test pins those."""
    accepted = 0
    for scheme, host, port, tail in itertools.product(SCHEMES, HOSTS, PORTS, TAILS):
        url = f"{scheme}://{host}{port}{tail}"
        stored, problem = cli_settings.normalize("CORS_ORIGINS", url)
        if problem:
            continue
        accepted += 1
        assert _server_origin(url) == stored, (url, stored)
        assert _server_origin(stored) == stored, (url, stored)
    assert accepted > 50


_SUGGESTION = re.compile(r"(?:lower case: |; use )'([^']*)'$")


def _cli_canonical(url: str) -> str | None:
    """What `config set` ends up storing for `url` when the operator
    follows each of its suggestions ("must be written in lower case: ...",
    "use ..."), or None if it refuses outright."""
    value = url
    for _ in range(4):
        stored, problem = cli_settings.normalize("CORS_ORIGINS", value)
        if problem is None:
            return stored
        suggestion = _SUGGESTION.search(problem)
        if not suggestion:
            return None
        value = suggestion.group(1)
    return None


def test_server_normalises_the_grid_to_what_the_cli_would_store():
    """Over the whole grid: wherever the CLI, followed through its
    suggestions, would store a value, the server rewrites the raw value to
    exactly that. Pins lower-casing and default-port dropping, which the
    CLI refuses rather than rewrites (PR #390 review)."""
    rewritten = 0
    for scheme, host, port, tail in itertools.product(SCHEMES, HOSTS, PORTS, TAILS):
        url = f"{scheme}://{host}{port}{tail}"
        canonical = _cli_canonical(url)
        if canonical is None:
            continue
        if host.startswith("[") and host.lower() not in canonical:
            # IPv6 text a browser never sends ([0:0::1], a dotted mapped
            # address): the CLI refuses it naming the browser's form, the
            # server keeps it as written (PR #390). The next test pins
            # that the CLI accepts no IPv6 text the server would keep
            # but a browser would not send.
            continue
        assert _server_origin(url) == canonical, (url, canonical)
        if url.rstrip("/") != canonical:
            rewritten += 1
    assert rewritten > 50  # capitals and default ports, not just slashes


def _browser_form(url: str) -> str | None:
    """`url` as a browser serialises an origin (WHATWG, which pydantic's
    URL type implements), or None if it does not parse."""
    from pydantic import AnyHttpUrl, ValidationError

    try:
        return str(AnyHttpUrl(url)).rstrip("/")
    except ValidationError:
        return None


def test_cli_accepts_exactly_the_ipv6_origins_the_server_keeps_and_a_browser_sends():
    """CHT-1710: over every IPv6 host in the grid, `config set
    CORS_ORIGINS` accepts a value if and only if the server keeps it
    unchanged and it is what a browser's Origin header would carry, so an
    accepted entry can match and a refused one could not have."""
    checked = accepted = 0
    for scheme, host, port, tail in itertools.product(SCHEMES, HOSTS, PORTS, TAILS):
        if not host.startswith("[") or port == ":0" or tail:
            # Port 0 the CLI refuses on its own; a tail is never an origin.
            continue
        url = f"{scheme}://{host}{port}"
        stored, problem = cli_settings.normalize("CORS_ORIGINS", url)
        sendable = _server_origin(url) == url and _browser_form(url) == url
        assert (problem is None) == sendable, (url, problem)
        checked += 1
        accepted += problem is None
    assert checked > 100 and accepted > 10


# (written by hand, what a browser sends): the server rewrites the first
# to the second; the CLI stores the second or refuses, naming it.
_ORIGIN_CASES = [
    ("https://tracker.example.com", "https://tracker.example.com"),
    ("https://tracker.example.com/", "https://tracker.example.com"),
    ("https://tracker.example.com//", "https://tracker.example.com"),
    ("https://Tracker.Example.com", "https://tracker.example.com"),
    ("HTTPS://tracker.example.com/", "https://tracker.example.com"),
    ("https://tracker.example.com:443", "https://tracker.example.com"),
    ("http://localhost:80/", "http://localhost"),
    ("http://LOCALHOST:6274/", "http://localhost:6274"),
    ("https://[2001:DB8::1]:8443", "https://[2001:db8::1]:8443"),
    # The IPv4-mapped form a browser sends (CHT-1710).
    ("http://[::FFFF:7F00:1]:6274/", "http://[::ffff:7f00:1]:6274"),
]


@pytest.mark.parametrize("raw, expected", [
    # IPv4-mapped: the first is what a browser sends (WHATWG writes hex
    # pieces); neither is rewritten into the other, on any Python.
    ("http://[::ffff:7f00:1]:6274", "http://[::ffff:7f00:1]:6274"),
    ("http://[::FFFF:7F00:1]/", "http://[::ffff:7f00:1]"),
    ("http://[::ffff:127.0.0.1]", "http://[::ffff:127.0.0.1]"),
    ("https://[2001:0DB8:0:0::1]:443", "https://[2001:0db8:0:0::1]"),
])
def test_ipv6_hosts_are_lower_cased_not_rewritten(raw, expected):
    assert _server_origin(raw) == expected


@pytest.mark.parametrize("host", [h for h in HOSTS if h.startswith("[") and "%" not in h])
def test_cli_writes_an_ipv6_issuer_host_as_pydantic_does(host):
    """APP_BASE_URL is compared with pydantic's (WHATWG) serialisation,
    so the CLI's suggested IPv6 form is exactly that on every Python,
    never Python's dotted IPv4-mapped form (CHT-1710)."""
    from pydantic import AnyHttpUrl

    expected = str(AnyHttpUrl(f"https://{host}")).rstrip("/")
    assert _cli_canonical_issuer(f"https://{host}") == expected


def _cli_canonical_issuer(url: str) -> str | None:
    value = url
    for _ in range(4):
        stored, problem = cli_settings.normalize("APP_BASE_URL", value)
        if problem is None:
            return stored
        suggestion = _SUGGESTION.search(problem)
        if not suggestion:
            return None
        value = suggestion.group(1)
    return None


@pytest.mark.parametrize("raw, expected", _ORIGIN_CASES)
def test_hand_written_origins_normalise_as_the_cli_says(raw, expected):
    assert _server_origin(raw) == expected
    stored, problem = cli_settings.normalize("CORS_ORIGINS", raw)
    assert stored == expected if problem is None else repr(expected) in problem, (stored, problem)


@pytest.mark.parametrize("raw", [
    "https://tracker.example.com/path", "https://tracker.example.com?q", "https://tracker.example.com#f",
    "https://u@tracker.example.com", "tracker.example.com", "https://tracker.example.com:65536",
    "https://bücher.example", "https://tracker example.com",
])
def test_non_origins_are_refused_by_both(raw):
    assert _server_origin(raw) is None
    assert cli_settings.normalize("CORS_ORIGINS", raw)[1] is not None


@pytest.mark.parametrize("line", [
    "A=b", "A=b # comment", "A=b#kept", "A='b # kept' # gone", 'A="b c"', "A=", "export A=b",
    "A = b", 'A="b \\" c" trailing', 'A="b \\" c"', 'A="b\\nc"', "A='b\\nc'", "A='it\\'s'",
    'A="unterminated', "A='q' # c", 'A="x"y',
])
def test_dotenv_reading_matches_python_dotenv(line):
    expected = {k.upper(): v for k, v in dotenv_values(stream=io.StringIO(line)).items()}
    assert cli_settings.parse_dotenv_names(line) == expected


_VAPID_SAMPLES = [
    "7gD3QmEeDDHi0Ywv7QqzKn5Up9IGI1DSUoUyRmTAH7c", "7gD3QmEeDDHi0Ywv7QqzKn5Up9IGI1DSUoUyRmTAH7c=",
    "A" * 43, "A" * 42 + "B", "_" * 43, "/" * 43, "+" * 43, "A" * 44, "A" * 42, "A" * 43 + "==",
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE", "_____wAAAAD__________7zm-q2nF56E87nKwvxjJVA",
    "_____wAAAAD__________7zm-q2nF56E87nKwvxjJVE", " 7gD3QmEeDDHi0Ywv7QqzKn5Up9IGI1DSUoUyRmTAH7c ",
]


@pytest.mark.parametrize("value", _VAPID_SAMPLES)
def test_cli_vapid_key_subset_of_server(value):
    """Every VAPID_PRIVATE_KEY the CLI accepts, the server starts with
    (CHT-1604)."""
    from app.utils import vapid

    stored, problem = cli_settings.normalize("VAPID_PRIVATE_KEY", value)
    if problem is None and stored:
        vapid._from_setting(stored)
