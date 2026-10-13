"""E2E: /ws authentication against the real uvicorn handshake (CHT-1603).

The backend suite (tests/test_ws_auth.py) pins the rules with a fake
socket; this checks what only a real handshake shows: the header and
subprotocol paths reach the app, the server selects ``chaotic`` and
never echoes the bearer entry, a refusal before accept fails the
handshake, and a revoked key's open socket is closed with 4001.
"""
import time

import pytest
from websockets.exceptions import ConnectionClosed, InvalidStatus
from websockets.sync.client import connect

from app.config import get_settings

TEST_PORT = 19876
BASE = f"ws://127.0.0.1:{TEST_PORT}"


def _url(team_id: str) -> str:
    return f"{BASE}/ws?team_id={team_id}"


def _assert_open(ws):
    ws.ping().wait(5)


class TestHandshake:
    def test_authorization_header(self, auth_token, test_team):
        with connect(_url(test_team["id"]), additional_headers={"Authorization": f"Bearer {auth_token}"},
                     open_timeout=5) as ws:
            _assert_open(ws)
            assert ws.subprotocol is None

    def test_subprotocol_entry_selects_chaotic(self, auth_token, test_team):
        with connect(_url(test_team["id"]), subprotocols=["chaotic", f"chaotic.bearer.{auth_token}"],
                     open_timeout=5) as ws:
            _assert_open(ws)
            assert ws.subprotocol == "chaotic"
            assert auth_token not in str(ws.response.headers)

    def test_api_key_by_header(self, api_client, test_team):
        key = api_client.create_api_key("ws e2e")["key"]
        with connect(_url(test_team["id"]), additional_headers={"Authorization": f"Bearer {key}"},
                     open_timeout=5) as ws:
            _assert_open(ws)

    def test_deprecated_query_token_still_works(self, auth_token, test_team):
        with connect(f"{_url(test_team['id'])}&token={auth_token}", open_timeout=5) as ws:
            _assert_open(ws)

    def test_broadcasts_arrive(self, api_client, auth_token, test_team):
        project = api_client.create_project(team_id=test_team["id"], name="WS", key="WSE")
        with connect(_url(test_team["id"]), subprotocols=["chaotic", f"chaotic.bearer.{auth_token}"],
                     open_timeout=5) as ws:
            api_client.create_issue(project_id=project["id"], title="live")
            deadline = time.monotonic() + 5
            seen = []
            while time.monotonic() < deadline:
                seen.append(ws.recv(timeout=5))
                if '"entity": "issue"' in seen[-1] or '"entity":"issue"' in seen[-1]:
                    break
            assert any("live" in m for m in seen), seen

    @pytest.mark.parametrize("how", ["none", "garbage", "cross_team"])
    def test_refused_before_accept(self, how, auth_token, auth_token2, test_team):
        headers = {
            "none": {},
            "garbage": {"Authorization": "Bearer garbage"},
            "cross_team": {"Authorization": f"Bearer {auth_token2}"},  # test_user2 is not in the team
        }[how]
        with pytest.raises(InvalidStatus) as exc:
            with connect(_url(test_team["id"]), additional_headers=headers, open_timeout=5):
                pass
        assert exc.value.response.status_code == 403


class TestMidConnection:
    @pytest.fixture
    def fast_recheck(self, monkeypatch):
        # The e2e server runs in this process, so it reads this setting.
        monkeypatch.setattr(get_settings(), "ws_auth_recheck_seconds", 0.2)

    def test_revoked_key_is_closed_4001(self, fast_recheck, api_client, test_team):
        created = api_client.create_api_key("ws revoke e2e")
        with connect(_url(test_team["id"]), additional_headers={"Authorization": f"Bearer {created['key']}"},
                     open_timeout=5) as ws:
            _assert_open(ws)
            api_client.revoke_api_key(created["id"])
            with pytest.raises(ConnectionClosed) as exc:
                ws.recv(timeout=5)
        assert exc.value.rcvd.code == 4001
