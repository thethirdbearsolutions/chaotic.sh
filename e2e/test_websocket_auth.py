"""E2E: /ws authentication against the real uvicorn handshake (CHT-1603).

The backend suite (tests/test_ws_auth.py) pins the rules with a fake
socket; this checks what only a real handshake shows: the header and
subprotocol paths reach the app, the server selects ``chaotic`` and
never echoes the bearer entry, a refused handshake is accepted and
closed with its code (4001 / 4003 / 4011, CHT-1615) rather than failed
with HTTP 403, a revoked key's open socket is closed with 4001 at once
(CHT-1616), and the periodic re-check still catches a revocation no
hook saw.
"""
import time

import pytest
from websockets.exceptions import ConnectionClosed
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

    @pytest.mark.parametrize("how, code", [
        ("none", 4001),
        ("garbage", 4001),
        ("expired", 4001),
        ("cross_team", 4003),  # test_user2 is not in the team
    ])
    def test_a_refusal_reaches_the_client_with_its_code(self, how, code, auth_token2, test_user, test_team):
        """CHT-1615 (and the part of CHT-1616 that waited on it): the
        handshake is accepted, then closed with the code, so a client can
        tell "sign in again" (4001) from "forbidden" (4003). A close
        before accept reached it as HTTP 403 whatever the code."""
        from datetime import timedelta

        from app.utils.security import create_access_token

        headers = {
            "none": {},
            "garbage": {"Authorization": "Bearer garbage"},
            "expired": {"Authorization": "Bearer " + create_access_token(
                data={"sub": test_user.id}, expires_delta=timedelta(seconds=-5),
            )},
            "cross_team": {"Authorization": f"Bearer {auth_token2}"},
        }[how]
        with connect(_url(test_team["id"]), additional_headers=headers, open_timeout=5) as ws:
            with pytest.raises(ConnectionClosed) as exc:
                ws.recv(timeout=5)
        assert exc.value.rcvd.code == code

    def test_a_browser_style_refusal_selects_chaotic_and_carries_the_code(self, test_team):
        """A browser that offered subprotocols fails a handshake that
        selects none (and would see 1006), so the refusal selects
        ``chaotic`` as an accepted handshake does."""
        with connect(_url(test_team["id"]), subprotocols=["chaotic", "chaotic.bearer.garbage"],
                     open_timeout=5) as ws:
            assert ws.subprotocol == "chaotic"
            with pytest.raises(ConnectionClosed) as exc:
                ws.recv(timeout=5)
        assert exc.value.rcvd.code == 4001

    def test_a_missing_team_id_is_refused_4003(self, auth_token):
        """Refused by the endpoint with a code, not by query validation
        before accept (PR #359 review, 7)."""
        with connect(f"{BASE}/ws", additional_headers={"Authorization": f"Bearer {auth_token}"},
                     open_timeout=5) as ws:
            with pytest.raises(ConnectionClosed) as exc:
                ws.recv(timeout=5)
        assert exc.value.rcvd.code == 4003

    def test_a_failed_check_reaches_the_client_as_4011(self, monkeypatch, auth_token, test_team):
        """4011 (retry) is told apart from 4003 (stop) too."""
        async def broken(token, team_id):
            raise RuntimeError("database is locked")

        # The e2e server runs in this process.
        monkeypatch.setattr("app.ws_auth.authenticate", broken)
        with connect(_url(test_team["id"]), additional_headers={"Authorization": f"Bearer {auth_token}"},
                     open_timeout=5) as ws:
            with pytest.raises(ConnectionClosed) as exc:
                ws.recv(timeout=5)
        assert exc.value.rcvd.code == 4011


class TestMidConnection:
    @pytest.fixture
    def fast_recheck(self, monkeypatch):
        # The e2e server runs in this process, so it reads this setting.
        monkeypatch.setattr(get_settings(), "ws_auth_recheck_seconds", 0.2)

    @pytest.fixture
    def no_recheck(self, monkeypatch):
        """An hour: a close inside a test can only come from the
        revocation itself (CHT-1616)."""
        monkeypatch.setattr(get_settings(), "ws_auth_recheck_seconds", 3600)

    def test_revoked_key_is_closed_4001_at_once(self, no_recheck, api_client, test_team):
        created = api_client.create_api_key("ws revoke e2e")
        with connect(_url(test_team["id"]), additional_headers={"Authorization": f"Bearer {created['key']}"},
                     open_timeout=5) as ws:
            _assert_open(ws)
            api_client.revoke_api_key(created["id"])
            with pytest.raises(ConnectionClosed) as exc:
                ws.recv(timeout=5)
        assert exc.value.rcvd.code == 4001

    def test_removed_member_is_closed_4003_at_once(self, no_recheck, api_client, auth_token2, test_user2, test_team):
        """Member removal through the real API, mid-connection: closed
        with 4003, and the code reaches the client (PR #352 review, 5)."""
        from conftest import _run_async

        from app.enums import TeamRole
        from app.oxyde_models.team import OxydeTeamMember

        _run_async(OxydeTeamMember.objects.create(team_id=test_team["id"], user_id=test_user2.id, role=TeamRole.MEMBER))
        with connect(_url(test_team["id"]), subprotocols=["chaotic", f"chaotic.bearer.{auth_token2}"],
                     open_timeout=5) as ws:
            _assert_open(ws)
            api_client.remove_member(test_team["id"], test_user2.id)
            with pytest.raises(ConnectionClosed) as exc:
                ws.recv(timeout=5)
        assert exc.value.rcvd.code == 4003

    def test_the_recheck_still_catches_a_revocation_made_elsewhere(self, fast_recheck, api_client, test_team):
        """The backstop: a key revoked by another process (here, straight
        in the database, so no hook runs) closes at the next re-check."""
        from conftest import _run_async

        from app.oxyde_models.api_key import OxydeAPIKey

        created = api_client.create_api_key("ws backstop e2e")
        with connect(_url(test_team["id"]), additional_headers={"Authorization": f"Bearer {created['key']}"},
                     open_timeout=5) as ws:
            _assert_open(ws)
            _run_async(OxydeAPIKey.objects.filter(id=created["id"]).update(is_active=False))
            with pytest.raises(ConnectionClosed) as exc:
                ws.recv(timeout=5)
        assert exc.value.rcvd.code == 4001
