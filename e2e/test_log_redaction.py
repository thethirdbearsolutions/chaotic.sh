"""E2E: credentials in a URL never reach uvicorn's request log lines
(CHT-1590, CHT-1597), against the real uvicorn the e2e server runs.

HTTP requests are logged on uvicorn.access, WebSocket handshakes on
uvicorn.error; the backend suite pins the rules (tests/test_log_redaction.py),
this asserts the real lines and that the app still sees the real query.
"""
import contextlib
import logging

import httpx
import pytest
from websockets.sync.client import connect

TEST_PORT = 19876
BASE = f"127.0.0.1:{TEST_PORT}"


@contextlib.contextmanager
def _captured_request_lines():
    """Every message uvicorn logs on its two request loggers. The e2e
    server runs at log_level="error"; open both just for this block."""
    lines = []

    class _Capture(logging.Handler):
        def emit(self, record):
            lines.append(record.getMessage())

    handler = _Capture(level=logging.INFO)
    saved = []
    for name in ("uvicorn.access", "uvicorn.error"):
        logger = logging.getLogger(name)
        saved.append((logger, logger.level))
        logger.addHandler(handler)
        logger.setLevel(logging.INFO)
    try:
        yield lines
    finally:
        for logger, level in saved:
            logger.removeHandler(handler)
            logger.setLevel(level)


@pytest.fixture
def api_key(api_client):
    return api_client.create_api_key("log redaction e2e")["key"]


class TestRequestLogRedaction:
    def test_ws_token_still_authenticates_and_is_logged_redacted(self, test_server, auth_token, test_team):
        """CHT-1597: the SPA's /ws?token=<login JWT>. The handler must
        still get the real JWT (the handshake is accepted, not closed
        4001), and the logged line must not carry it."""
        url = f"ws://{BASE}/ws?token={auth_token}&team_id={test_team['id']}"
        with _captured_request_lines() as lines:
            with connect(url, open_timeout=5) as ws:
                ws.ping().wait(5)  # an open, authenticated connection

        ws_lines = [line for line in lines if '"WebSocket /ws' in line]
        assert ws_lines, lines
        assert any("[accepted]" in line for line in ws_lines)
        for line in lines:
            assert auth_token not in line
        assert any("/ws?token=[redacted]&team_id=" in line for line in ws_lines)

    def test_http_query_secrets_are_logged_redacted(self, test_server, api_key):
        """CHT-1590: a minted secret or a credential parameter in a query
        string, on the access log, including the 401 it earns."""
        with _captured_request_lines() as lines:
            resp = httpx.get(
                f"http://{BASE}/api/auth/me", params={"api_key": "anything", "q": f"x {api_key}"}, timeout=5.0,
            )
        assert resp.status_code == 401
        access = [line for line in lines if "/api/auth/me" in line]
        assert access, lines
        for line in access:
            assert api_key not in line
            assert "api_key=[redacted]" in line
            assert f"ck_...{api_key[-4:]}" in line
