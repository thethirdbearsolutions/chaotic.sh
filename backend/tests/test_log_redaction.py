"""uvicorn request-line redaction (CHT-1590, CHT-1597).

The filter in app.log_redaction scrubs credentials from the request
target uvicorn logs, on uvicorn.access (HTTP) and uvicorn.error
(WebSocket handshakes). The real uvicorn lines are asserted in
e2e/test_log_redaction.py; these pin the rules and the install.
"""
import ast
import logging
from pathlib import Path

import pytest

from app import log_redaction
from app.enums import TokenKind
from app.log_redaction import (
    CREDENTIAL_PARAMS,
    REDACTED,
    SECRET_PATTERN,
    RequestLineRedactionFilter,
    redact_request_target,
)
from app.services import token_service
from app.services.api_key_service import APIKeyService
from app.services.token_service import ALL_SECRET_PREFIXES, CLIENT_SECRET_PREFIX, mint_secret

HEX = "ab" * 32
JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1In0.c2lnbmF0dXJl"


class TestSecretFormat:
    def test_every_minter_matches_the_pattern(self):
        """The pattern is derived from mint_secret; every real minter
        must produce exactly that shape."""
        minted = [APIKeyService()._generate_key(), mint_secret(CLIENT_SECRET_PREFIX)]
        minted += [token_service._new_token(kind) for kind in TokenKind]
        for secret in minted:
            assert SECRET_PATTERN.fullmatch(secret), secret
        assert {s[: s.index("_") + 1] for s in minted} == set(ALL_SECRET_PREFIXES)

    def test_client_secrets_are_a_known_prefix(self):
        """PR #350 review: ccs_ was minted but missing from the set."""
        assert "ccs_" in ALL_SECRET_PREFIXES

    # Every call that draws randomness in app/, and why it is not a secret
    # (a secret must go through mint_secret so the log filter knows its
    # shape). Keys are (path glob, source); every entry must still match.
    _ALLOWED_RANDOM = {
        ("app/services/token_service.py", "token_hex"): "mint_secret itself",
        ("app/services/oauth_client_service.py", "token_hex"): "DCR client_id: public, not a secret",
        ("app/services/oauth_consent_service.py", "token_urlsafe"): "consent request id, needs a signed-in human",
        ("app/services/team_service.py", "token_urlsafe"): "team invitation token, CHT-1601",
        ("app/oxyde_models/*.py", "uuid4"): "row primary keys: public ids",
        ("app/oxyde_db.py", "uuid4"): "primary-key default for a str pk column",
        ("app/services/agent_service.py", "uuid4"): "placeholder agent email, not a credential",
        ("app/services/registration_service.py", "uuid4"): "suffix of a placeholder agent email",
        ("app/api/idempotency.py", "uuid4"): "idempotency claim token: names a request, grants nothing",
        ("app/services/issue_service.py", "random"): "shuffles issue order for display",
        ("app/services/ritual_selection.py", "random"): "seeded ritual sampling, deterministic by design",
        ("app/services/push_sender.py", "urandom"): "RFC 8188 per-message salt for Web Push encryption, sent in clear",
    }
    _TOKEN_CALLS = {"token_hex", "token_urlsafe", "token_bytes", "urandom", "uuid4", "randbits", "SystemRandom"}

    @classmethod
    def _random_source(cls, func: ast.expr) -> str | None:
        """The randomness a call draws on, or None: a bare or dotted
        `token_*`, `urandom`, `uuid4`, any `secrets.*`, any `random.*`."""
        if isinstance(func, ast.Name):
            return func.id if func.id in cls._TOKEN_CALLS else None
        if isinstance(func, ast.Attribute):
            if func.attr in cls._TOKEN_CALLS:
                return func.attr
            if isinstance(func.value, ast.Name) and func.value.id in ("secrets", "random"):
                return func.value.id if func.value.id == "random" else func.attr
        return None

    def test_no_secret_is_minted_outside_mint_secret(self):
        from fnmatch import fnmatch

        app_dir = Path(__file__).resolve().parents[1] / "app"
        found = set()
        for path in app_dir.rglob("*.py"):
            for node in ast.walk(ast.parse(path.read_text())):
                if isinstance(node, ast.Call) and (source := self._random_source(node.func)):
                    found.add((str(path.relative_to(app_dir.parent)), source))
        unexplained = {
            (f, src) for f, src in found
            if not any(fnmatch(f, glob) and src == s for glob, s in self._ALLOWED_RANDOM)
        }
        assert not unexplained, f"mint secrets with mint_secret, or allowlist with a reason: {unexplained}"
        stale = {
            (glob, s) for glob, s in self._ALLOWED_RANDOM
            if not any(fnmatch(f, glob) and src == s for f, src in found)
        }
        assert not stale, f"allowlist entries that match nothing: {stale}"

    @pytest.mark.parametrize(
        "code, source",
        [
            ("from secrets import token_hex\ntoken_hex(8)", "token_hex"),
            ("import os\nos.urandom(8)", "urandom"),
            ("import uuid\nuuid.uuid4().hex", "uuid4"),
            ("from uuid import uuid4\nuuid4()", "uuid4"),
            ("import secrets\nsecrets.choice('ab')", "choice"),
            ("import random\nrandom.getrandbits(8)", "random"),
            ("len('x')", None),
        ],
    )
    def test_the_guard_sees_every_spelling(self, code, source):
        calls = [n for n in ast.walk(ast.parse(code)) if isinstance(n, ast.Call)]
        assert {self._random_source(c.func) for c in calls} - {None} == ({source} if source else set())


class TestRequestTarget:
    @pytest.mark.parametrize("prefix", ALL_SECRET_PREFIXES)
    def test_minted_secrets_anywhere(self, prefix):
        secret = prefix + HEX
        assert redact_request_target(f"/x/{secret}?q={secret}") == f"/x/{prefix}...abab?q={prefix}...abab"

    @pytest.mark.parametrize("name", sorted(CREDENTIAL_PARAMS))
    def test_credential_names_whatever_the_value(self, name):
        assert redact_request_target(f"/p?{name}=anything&team_id=t") == f"/p?{name}={REDACTED}&team_id=t"

    @pytest.mark.parametrize("name", ["TOKEN", "Access_Token", "%74oken", "+token"])
    def test_credential_names_any_case_or_encoding(self, name):
        assert redact_request_target(f"/p?{name}=v") == f"/p?{name}={REDACTED}"

    def test_ws_jwt(self):
        """CHT-1597: the SPA's /ws?token=<login JWT>."""
        assert redact_request_target(f"/ws?token={JWT}&team_id=t1") == f"/ws?token={REDACTED}&team_id=t1"

    @pytest.mark.parametrize(
        "query, logged",
        [
            # PR #350 review, finding 4: a secret in the middle of a value.
            ("a==ck_{hex}", "a==ck_...abab"),
            ("a=b=ck_{hex}", "a=b=ck_...abab"),
            ("q=%20ck_{hex}", "q=%20ck_...abab"),
            ("q=+ck_{hex}", "q=+ck_...abab"),
            ("q=foo+ck_{hex}", "q=foo+ck_...abab"),
            ("q=%22ck_{hex}%22", "q=%22ck_...abab%22"),
            ("q=\"ck_{hex}\"", "q=\"ck_...abab\""),
            ("cb=http%3A%2F%2Fx%2F%3Fkey%3Dck_{hex}", "cb=http%3A%2F%2Fx%2F%3Fkey%3Dck_...abab"),
            # Hidden under encoding: the whole value goes.
            ("q=%63k_{hex}", f"q={REDACTED}"),
            ("q=%2563k_{hex}", f"q={REDACTED}"),
            ("%63k_{hex}=1", REDACTED),
            # Separators, a bare secret and repeats.
            ("a=1;token=x&b=2", f"a=1;token={REDACTED}&b=2"),
            ("ck_{hex}", "ck_...abab"),
            ("k=ck_{hex}&k=cat_{hex}", "k=ck_...abab&k=cat_...abab"),
        ],
    )
    def test_query_shapes(self, query, logged):
        assert redact_request_target("/p?" + query.format(hex=HEX)) == "/p?" + logged

    @pytest.mark.parametrize(
        "target",
        [
            # The false positives the scope rewrite had (PR #350 review, 1):
            # a client's state or PKCE challenge is not a minted secret.
            "/cli-auth?state=ck_AbCdEfGhIjKlMnOpQr",
            "/oauth/authorize?code_challenge=cat_" + "A" * 39 + "&state=s",
            "/api/projects/ck_short?search=ck_123",
            "/p?&&=&x",
            "/plain",
        ],
    )
    def test_left_alone(self, target):
        assert redact_request_target(target) == target


class TestScanCap:
    """PR #350 re-review: the work is linear but runs on the event loop,
    and a crafted 60 KB target cost ~55x a request. These count the
    characters the decoder is handed instead of timing anything."""

    @pytest.fixture
    def decoded(self, monkeypatch):
        seen = []
        real = log_redaction.unquote_plus

        def counting(text, *args, **kwargs):
            seen.append(len(text))
            return real(text, *args, **kwargs)

        monkeypatch.setattr(log_redaction, "unquote_plus", counting)
        return seen

    def test_a_60kb_crafted_query_is_omitted_unscanned(self, decoded):
        query = "%2525=%2525&" * 5000 + f"token={JWT}&k=ck_{HEX}"
        target = "/p?" + query
        assert len(target) > 60_000
        assert redact_request_target(target) == f"/p?[{len(query)}-byte query omitted]"
        assert decoded == []

    def test_just_under_the_cap_is_scanned_with_bounded_work(self, decoded):
        unit = "%2525=%2525&"
        tail = f"k=ck_{HEX}"
        query = unit * ((log_redaction.MAX_SCANNED - len(tail)) // len(unit)) + tail
        assert len(query) <= log_redaction.MAX_SCANNED
        assert redact_request_target("/p?" + query).endswith("k=ck_...abab")
        # Each name and value is decoded at most _MAX_DECODE times (plus
        # one decode of each name for the credential check).
        assert sum(decoded) <= (log_redaction._MAX_DECODE + 1) * len(query)

    def test_a_long_path_is_omitted(self):
        path = "/" + "a" * log_redaction.MAX_SCANNED + f"ck_{HEX}"
        assert redact_request_target(path + "?token=x") == f"[{len(path)}-byte path omitted]?token={REDACTED}"

    def test_a_long_non_target_string_is_omitted(self):
        text = "x" * log_redaction.MAX_SCANNED + f"ck_{HEX}"
        record = logging.getLogger("uvicorn.error").makeRecord("uvicorn.error", logging.INFO, __file__, 1, "%s", (text,), None)
        RequestLineRedactionFilter().filter(record)
        assert record.getMessage() == f"[{len(text)}-byte string omitted]"

    def test_fast_path_scans_nothing(self, monkeypatch, decoded):
        def boom(*args):
            raise AssertionError("scanned")

        monkeypatch.setattr(log_redaction, "redact_secrets", boom)
        assert redact_request_target("/api/issues/CHT-1/comments") == "/api/issues/CHT-1/comments"
        assert decoded == []


class TestFilter:
    def _record(self, logger, msg, args):
        return logging.getLogger(logger).makeRecord(logger, logging.INFO, __file__, 1, msg, args, None)

    def test_access_line(self):
        record = self._record(
            "uvicorn.access", '%s - "%s %s HTTP/%s" %d',
            ("1.2.3.4:5", "GET", f"/x?token={JWT}&k=ck_{HEX}", "1.1", 200),
        )
        RequestLineRedactionFilter().filter(record)
        line = record.getMessage()
        assert JWT not in line and HEX not in line
        assert line == f'1.2.3.4:5 - "GET /x?token={REDACTED}&k=ck_...abab HTTP/1.1" 200'

    def test_websocket_line(self):
        record = self._record("uvicorn.error", '%s - "WebSocket %s" [accepted]', ("1.2.3.4:5", f"/ws?token={JWT}"))
        RequestLineRedactionFilter().filter(record)
        assert record.getMessage() == f'1.2.3.4:5 - "WebSocket /ws?token={REDACTED}" [accepted]'

    def test_plain_message_and_other_args(self):
        record = self._record("uvicorn.error", f"boom ck_{HEX}", None)
        RequestLineRedactionFilter().filter(record)
        assert record.getMessage() == "boom ck_...abab"
        record = self._record("uvicorn.error", "%s %d %s", ("not a ?token=x path", 3, None))
        RequestLineRedactionFilter().filter(record)
        assert record.getMessage() == "not a ?token=x path 3 None"


class TestMappingArgs:
    def test_a_mapping_args_record_passes_through_untouched(self):
        """Not a shape uvicorn logs; documented as passed through."""
        record = logging.getLogger("uvicorn.error").makeRecord(
            "uvicorn.error", logging.INFO, __file__, 1, "%(a)s", ({"a": "x"},), None,
        )
        assert RequestLineRedactionFilter().filter(record) is True
        assert record.getMessage() == "x"


class TestInstall:
    @pytest.fixture(autouse=True)
    def restore_uvicorn_loggers(self):
        """uvicorn.Config applies a process-wide dictConfig; put the
        uvicorn loggers back so no other test sees it."""
        saved = []
        for name in ("uvicorn", *log_redaction.LOGGERS):
            logger = logging.getLogger(name)
            saved.append((logger, list(logger.handlers), list(logger.filters), logger.level, logger.propagate,
                          logger.disabled))
        yield
        for logger, handlers, filters, level, propagate, disabled in saved:
            logger.handlers[:] = handlers
            logger.filters[:] = filters
            logger.level, logger.propagate, logger.disabled = level, propagate, disabled

    def test_installed_on_both_loggers_by_importing_the_app(self):
        import app.main  # noqa: F401

        for name in log_redaction.LOGGERS:
            filters = logging.getLogger(name).filters
            assert sum(isinstance(f, RequestLineRedactionFilter) for f in filters) == 1

    def test_install_is_idempotent(self):
        log_redaction.install()
        log_redaction.install()
        for name in log_redaction.LOGGERS:
            filters = logging.getLogger(name).filters
            assert sum(isinstance(f, RequestLineRedactionFilter) for f in filters) == 1

    def test_survives_uvicorns_logging_config(self):
        """Every runner applies uvicorn's dictConfig (``Config`` does it
        on construction): the filter must still be there afterwards."""
        import uvicorn

        log_redaction.install()
        uvicorn.Config(app="app.main:app", log_level="info")
        for name in log_redaction.LOGGERS:
            assert any(isinstance(f, RequestLineRedactionFilter) for f in logging.getLogger(name).filters)

    async def test_lifespan_reinstalls(self, monkeypatch):
        """Drive app.main's real lifespan, with only its I/O stubbed (as
        test_mcp_endpoint's startup-warning test does)."""
        import contextlib

        import app.main as main

        async def noop(*args, **kwargs):
            return None

        @contextlib.asynccontextmanager
        async def no_mcp():
            yield

        for name in ("init_oxyde", "close_oxyde", "bootstrap_if_empty", "verify_migrations_current",
                     "_mcp_toolset_fingerprint"):
            monkeypatch.setattr(main, name, noop)
        monkeypatch.setattr(main, "get_version_info", lambda *a, **k: None)
        monkeypatch.setattr(main, "mcp_lifespan", no_mcp)
        monkeypatch.setattr(main.settings, "secret_key", "x" * 32)
        for name in log_redaction.LOGGERS:
            monkeypatch.setattr(logging.getLogger(name), "filters", [])

        async with main.lifespan(main.app):
            for name in log_redaction.LOGGERS:
                assert any(isinstance(f, RequestLineRedactionFilter) for f in logging.getLogger(name).filters)
