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
reading it reports on, against python-dotenv.
"""
import importlib.util
import io
import itertools
import sys
from pathlib import Path

import pytest
from dotenv import dotenv_values

from app.config import oauth_issuer_problem

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
    "[::1]", "[0:0::1]", "[::ffff:127.0.0.1]", "[::FFFF:7f00:1]", "[2001:db8::1]", "[2001:0db8::1]",
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
