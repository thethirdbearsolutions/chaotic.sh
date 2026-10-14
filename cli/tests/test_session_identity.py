"""Automatic per-session identity (CHT-1499): `session_identity: auto`.

Runs the real ``cli.client.Client`` and ``cli.session_identity`` against a
fake server (httpx.MockTransport) that keeps the server's rules: one live
key per identity, a registrar may register and read but not write.
"""
from __future__ import annotations

import json
import multiprocessing
import os
import stat
import threading
from datetime import datetime, timedelta, timezone
from itertools import count
from unittest.mock import patch

import httpx
import pytest

from cli import config as cli_config
from cli import session_identity as si
from cli.client import APIError, Client

API = "http://chaotic.test/api"
REGISTRAR_KEY = "ck_registrar"
SESSION_ID = "4f2a9c1e-7777-4abc-9def-000000000001"
REF = si.REF_PREFIX + SESSION_ID


class FakeServer:
    """Just enough of the server for these tests."""

    def __init__(self, *, me=None, register_status=201, register_detail=None):
        self.me = me or {"id": "reg-1", "name": "Claude Code", "is_agent": True,
                         "kind": "service", "can_register": True}
        self.register_status = register_status
        self.register_detail = register_detail
        self.live_keys: dict[str, str] = {}  # key -> agent id
        self.registrations: list[dict] = []
        self.requests: list[tuple[str, str, str]] = []  # (method, path, bearer)
        self.expires_in = timedelta(days=7)
        self._n = count(1)
        self.lock = threading.Lock()

    def handler(self, request: httpx.Request) -> httpx.Response:
        bearer = request.headers.get("Authorization", "").removeprefix("Bearer ")
        path = request.url.path.removeprefix("/api")
        with self.lock:
            self.requests.append((request.method, path, bearer))
        if path == "/auth/me" and bearer == REGISTRAR_KEY:
            return httpx.Response(200, json=self.me)
        if path == "/agents/register":
            assert bearer == REGISTRAR_KEY
            body = json.loads(request.content)
            with self.lock:
                self.registrations.append(body)
                if self.register_status >= 400:
                    return httpx.Response(self.register_status, json={"detail": self.register_detail})
                # One live key per identity: registering revokes the others.
                self.live_keys = {k: a for k, a in self.live_keys.items() if a != "sess-1"}
                key = f"ck_session_{next(self._n)}"
                self.live_keys[key] = "sess-1"
            return httpx.Response(201, json={
                "agent": {"id": "sess-1", "name": body.get("name") or "Claude Code · 00000001",
                          "kind": "session", "external_ref": body["external_ref"]},
                "created": len(self.registrations) == 1,
                "api_key": key,
                "api_key_id": f"kid-{key}",
                "expires_at": (datetime.now(timezone.utc) + self.expires_in).isoformat(),
            })
        if bearer == REGISTRAR_KEY:
            if request.method == "GET":
                return httpx.Response(200, json={"as": "registrar"})
            return httpx.Response(403, json={"detail": {"error_code": "registrar_cannot_write",
                                                        "message": "This agent is a registrar"}})
        if bearer in self.live_keys:
            return httpx.Response(200, json={"as": self.live_keys[bearer], "key": bearer})
        return httpx.Response(401, json={"detail": "Could not validate credentials"})

    def revoke_all(self):
        self.live_keys.clear()

    def sent_with(self, key):
        return [r for r in self.requests if r[2] == key]


@pytest.fixture
def home(tmp_path, monkeypatch):
    monkeypatch.setattr(cli_config, "GLOBAL_CONFIG_DIR", tmp_path)
    monkeypatch.setattr(cli_config, "_current_profile", None)
    monkeypatch.delenv("CHAOTIC_PROFILE", raising=False)
    return tmp_path


@pytest.fixture
def server(monkeypatch):
    srv = FakeServer()
    real = httpx.Client
    monkeypatch.setattr(httpx, "Client", lambda *a, **kw: real(transport=httpx.MockTransport(srv.handler)))
    return srv


@pytest.fixture
def auto(monkeypatch, home):
    monkeypatch.setenv(si.MODE_ENV, "auto")
    monkeypatch.setenv(si.SESSION_ENV, SESSION_ID)


@pytest.fixture
def configured():
    with patch("cli.client.get_api_url", return_value=API), \
         patch("cli.client.get_api_key", return_value=REGISTRAR_KEY), \
         patch("cli.client.get_token", return_value=None), \
         patch("cli.config.get_current_team", return_value="team-1"):
        yield


def _cache():
    return si.cache_path(REF)


class TestOffByDefault:
    def test_without_the_setting_the_configured_key_is_used(self, home, server, configured, monkeypatch):
        monkeypatch.setenv(si.SESSION_ENV, SESSION_ID)
        assert Client()._request("GET", "/issues") == {"as": "registrar"}
        assert server.registrations == []
        assert not (home / "sessions").exists()

    def test_auto_outside_claude_code_changes_nothing(self, home, server, configured, monkeypatch):
        monkeypatch.setenv(si.MODE_ENV, "auto")
        assert Client()._request("GET", "/issues") == {"as": "registrar"}
        assert server.registrations == []

    def test_the_profile_setting_turns_it_on(self, home, server, configured, monkeypatch):
        monkeypatch.setenv(si.SESSION_ENV, SESSION_ID)
        si.set_mode("auto")
        assert json.loads((home / "config.json").read_text())["session_identity"] == "auto"
        assert Client()._request("GET", "/issues")["as"] == "sess-1"
        si.set_mode("off")
        assert "session_identity" not in json.loads((home / "config.json").read_text())

    def test_the_environment_overrides_the_profile(self, home, server, configured, monkeypatch):
        monkeypatch.setenv(si.SESSION_ENV, SESSION_ID)
        si.set_mode("auto")
        monkeypatch.setenv(si.MODE_ENV, "off")
        assert Client()._request("GET", "/issues") == {"as": "registrar"}

    def test_an_invalid_mode_is_refused(self, home, server, configured, monkeypatch):
        monkeypatch.setenv(si.SESSION_ENV, SESSION_ID)
        monkeypatch.setenv(si.MODE_ENV, "yes")
        with pytest.raises(APIError, match="must be 'auto' or 'off'"):
            Client()._request("GET", "/issues")
        with pytest.raises(si.SessionIdentityError):
            si.set_mode("on")


class TestAutoMode:
    def test_first_request_registers_and_caches_the_session_key(self, auto, server, configured, home):
        with patch("cli.session_identity._workspace_label", return_value="cht-1499"):
            result = Client()._request("POST", "/issues", {"title": "x"})

        assert result["as"] == "sess-1"
        assert len(server.registrations) == 1
        body = server.registrations[0]
        assert body["external_ref"] == REF
        assert body["name"] == f"Claude Code · cht-1499 · {SESSION_ID[:6]}"
        assert "team_id" not in body  # an agent registrar registers in its own team
        # The write went with the session key, never with the registrar's.
        assert [r for r in server.sent_with(REGISTRAR_KEY) if r[1] not in ("/auth/me", "/agents/register")] == []

        record = json.loads(_cache().read_text())
        assert record["external_ref"] == REF and record["api_url"] == API
        assert record["api_key"] == result["key"]
        assert REGISTRAR_KEY not in _cache().read_text()
        assert stat.S_IMODE(_cache().stat().st_mode) == 0o600
        assert stat.S_IMODE((home / "sessions").stat().st_mode) == 0o700
        assert _cache().name == f"{__import__('hashlib').sha256(REF.encode()).hexdigest()[:16]}.json"

    def test_later_requests_and_processes_reuse_the_cache(self, auto, server, configured):
        first = Client()._request("GET", "/issues")["key"]
        second = Client()._request("GET", "/issues")["key"]
        assert first == second
        assert len(server.registrations) == 1

    def test_a_revoked_key_re_registers_once_and_keeps_the_name(self, auto, server, configured):
        old = Client()._request("GET", "/issues")["key"]
        server.revoke_all()

        new = Client()._request("GET", "/issues")["key"]

        assert new != old
        assert len(server.registrations) == 2
        assert "name" not in server.registrations[1]  # a renewal keeps the server's name
        assert json.loads(_cache().read_text())["api_key"] == new

    def test_a_second_401_is_an_error_not_a_loop(self, auto, server, configured):
        Client()._request("GET", "/issues")
        original = server.handler

        def always_401(request):
            if request.url.path.endswith(("/auth/me", "/agents/register")):
                return original(request)
            server.requests.append((request.method, request.url.path, "x"))
            return httpx.Response(401, json={"detail": "Could not validate credentials"})

        server.handler = always_401  # the fixture's transport reads it per client
        with pytest.raises(APIError) as refused:
            Client()._request("GET", "/issues")
        assert refused.value.status_code == 401
        assert len(server.registrations) == 2

    def test_an_expiring_key_is_renewed_before_use(self, auto, server, configured):
        server.expires_in = timedelta(seconds=30)  # inside the margin
        Client()._request("GET", "/issues")
        Client()._request("GET", "/issues")
        assert len(server.registrations) == 2

    def test_a_key_already_replaced_by_another_process_is_used_as_is(self, auto, server, configured):
        old = Client()._request("GET", "/issues")["key"]
        # Another process of this session re-registered and saved its key.
        record = json.loads(_cache().read_text())
        server.revoke_all()
        server.live_keys["ck_other_process"] = "sess-1"
        si.write_cache(_cache(), {**record, "api_key": "ck_other_process"})

        assert si.session_key(REF, REGISTRAR_KEY, API, failed_key=old) == "ck_other_process"
        assert len(server.registrations) == 1

    def test_suspended_sends_the_configured_key(self, auto, server, configured):
        with si.suspended():
            assert Client()._request("GET", "/issues") == {"as": "registrar"}
        assert server.registrations == []

    def test_register_agent_is_always_the_registrars_call(self, auto, server, configured):
        Client().register_agent("claude-code:session:manual", name=None)
        assert server.requests[-1] == ("POST", "/agents/register", REGISTRAR_KEY)
        assert server.registrations[-1] == {"external_ref": "claude-code:session:manual"}

    def test_a_person_registers_in_the_current_team(self, auto, server, configured):
        server.me = {"id": "u-1", "name": "Ada", "is_agent": False}
        Client()._request("GET", "/issues")
        assert server.registrations[0]["team_id"] == "team-1"

    def test_a_person_without_a_team_fails_loudly(self, auto, server):
        server.me = {"id": "u-1", "name": "Ada", "is_agent": False}
        with patch("cli.client.get_api_url", return_value=API), \
             patch("cli.client.get_api_key", return_value=REGISTRAR_KEY), \
             patch("cli.config.get_current_team", return_value=None), \
             pytest.raises(APIError, match="no team is selected"):
            Client()._request("GET", "/issues")
        assert server.registrations == []


class TestFailsLoudly:
    def _no_data_request_sent(self, server):
        return [r for r in server.requests if r[1] not in ("/auth/me", "/agents/register")] == []

    def test_a_refused_registration_never_falls_back(self, auto, server, configured):
        server.register_status = 429
        server.register_detail = {"error_code": "registration_rate_limited", "message": "Too many"}
        with pytest.raises(APIError) as refused:
            Client()._request("POST", "/issues", {"title": "x"})
        assert refused.value.status_code == 429
        assert refused.value.detail["error_code"] == "registration_rate_limited"
        assert "Not falling back to the registrar key" in str(refused.value)
        assert self._no_data_request_sent(server)
        assert not _cache().exists()

    def test_a_key_that_is_not_a_registrar_is_named(self, auto, server, configured):
        server.me = {"id": "a-1", "name": "claude-bot", "is_agent": True, "kind": "assistant",
                     "can_register": False}
        with pytest.raises(APIError, match="--registrar"):
            Client()._request("GET", "/issues")
        assert server.registrations == [] and self._no_data_request_sent(server)

    def test_a_session_key_configured_as_registrar_is_refused(self, auto, server, configured):
        server.me = {"id": "s-1", "name": "old session", "is_agent": True, "kind": "session",
                     "registered_by_id": "reg-1", "can_register": False}
        with pytest.raises(APIError, match="not a registrar"):
            Client()._request("GET", "/issues")
        assert server.registrations == []

    def test_a_rejected_registrar_key(self, auto, server):
        with patch("cli.client.get_api_url", return_value=API), \
             patch("cli.client.get_api_key", return_value="ck_wrong"), \
             patch("cli.client.get_token", return_value=None), \
             pytest.raises(APIError, match="configured key was rejected") as refused:
            Client()._request("GET", "/issues")
        assert refused.value.status_code == 401

    def test_no_registrar_key(self, auto, server):
        with patch("cli.client.get_api_url", return_value=API), \
             patch("cli.client.get_api_key", return_value=None), \
             patch("cli.client.get_token", return_value=None), \
             pytest.raises(APIError, match="no registrar key"):
            Client()._request("GET", "/issues")

    @pytest.mark.parametrize("session_id", ["has space", "x" * 200, " "])
    def test_an_unusable_session_id(self, auto, server, configured, monkeypatch, session_id):
        monkeypatch.setenv(si.SESSION_ENV, session_id)
        with pytest.raises(APIError, match="not a usable session id"):
            Client()._request("GET", "/issues")
        assert server.requests == []


class TestTheCacheFile:
    def _seed(self, server):
        Client()._request("GET", "/issues")
        assert len(server.registrations) == 1

    def test_a_world_readable_cache_is_not_trusted(self, auto, server, configured):
        self._seed(server)
        os.chmod(_cache(), 0o644)
        Client()._request("GET", "/issues")
        assert len(server.registrations) == 2
        assert stat.S_IMODE(_cache().stat().st_mode) == 0o600

    def test_a_symlinked_cache_is_not_followed(self, auto, server, configured, tmp_path):
        self._seed(server)
        planted = tmp_path / "planted.json"
        planted.write_text(_cache().read_text())
        os.chmod(planted, 0o600)
        _cache().unlink()
        _cache().symlink_to(planted)

        Client()._request("GET", "/issues")

        assert len(server.registrations) == 2
        assert not _cache().is_symlink()
        assert json.loads(planted.read_text())["api_key"] == "ck_session_1"  # untouched

    def test_a_cache_for_another_server_is_not_sent_there(self, auto, server, configured):
        self._seed(server)
        record = json.loads(_cache().read_text())
        si.write_cache(_cache(), {**record, "api_url": "http://elsewhere/api"})
        Client()._request("GET", "/issues")
        assert len(server.registrations) == 2

    def test_a_cache_from_another_registrar_is_not_used(self, auto, server, configured):
        self._seed(server)
        record = json.loads(_cache().read_text())
        si.write_cache(_cache(), {**record, "registrar": si.fingerprint("ck_someone_else")})
        Client()._request("GET", "/issues")
        assert len(server.registrations) == 2

    @pytest.mark.parametrize("content", ["not json", "[]", '{"api_key": ""}'])
    def test_a_garbled_cache_is_replaced(self, auto, server, configured, content):
        _cache().parent.mkdir(mode=0o700, parents=True, exist_ok=True)
        fd = os.open(_cache(), os.O_WRONLY | os.O_CREAT, 0o600)
        os.write(fd, content.encode())
        os.close(fd)
        Client()._request("GET", "/issues")
        assert len(server.registrations) == 1

    def test_a_loose_sessions_directory_is_tightened(self, auto, server, configured, home):
        (home / "sessions").mkdir(mode=0o755)
        os.chmod(home / "sessions", 0o755)
        self._seed(server)
        assert stat.S_IMODE((home / "sessions").stat().st_mode) == 0o700

    def test_a_symlinked_sessions_directory_is_refused(self, auto, server, configured, home, tmp_path_factory):
        elsewhere = tmp_path_factory.mktemp("elsewhere")
        (home / "sessions").symlink_to(elsewhere)
        with pytest.raises(APIError, match="must be a directory"):
            Client()._request("GET", "/issues")

    def test_cached_record_hides_the_key(self, auto, server, configured):
        self._seed(server)
        shown = si.cached_record(REF)
        assert shown["agent_id"] == "sess-1" and "api_key" not in shown
        assert si.cached_record("claude-code:session:none") is None


class TestConcurrentRegistration:
    """Two processes (or MCP worker threads) of one session starting at
    once must register once: the server revokes an identity's other keys
    on every registration, so a second registration would kill the first
    one's key."""

    def test_threads_register_once(self, auto, server, configured):
        keys = []
        errors = []

        def work():
            try:
                keys.append(Client()._request("GET", "/issues")["key"])
            except Exception as exc:  # pragma: no cover - reported below
                errors.append(exc)

        threads = [threading.Thread(target=work) for _ in range(8)]
        for t in threads:
            t.start()
        for t in threads:
            t.join()
        assert errors == []
        assert len(server.registrations) == 1
        assert len(set(keys)) == 1

    def test_processes_register_once(self, auto, home, tmp_path):
        log = tmp_path / "registrations.log"
        ctx = multiprocessing.get_context("fork")
        start = ctx.Barrier(4)
        results = ctx.Queue()
        procs = [ctx.Process(target=_process_worker, args=(str(home), str(log), start, results)) for _ in range(4)]
        for p in procs:
            p.start()
        for p in procs:
            p.join(30)
        keys = [results.get(timeout=5) for _ in procs]
        assert all(p.exitcode == 0 for p in procs)
        assert len(log.read_text().splitlines()) == 1
        assert len(set(keys)) == 1


def _process_worker(home, log, start, results):
    """One process of the session: registering is slow, so without the
    lock every process would register."""
    import time

    cli_config.GLOBAL_CONFIG_DIR = home
    counter = iter(range(1000))

    def slow_register(ref, credential, api_url, *, renew):
        with open(log, "a") as f:
            f.write(f"{os.getpid()}\n")
        time.sleep(0.3)
        return {"external_ref": ref, "api_url": api_url, "registrar": si.fingerprint(credential),
                "api_key": f"ck_{os.getpid()}_{next(counter)}", "expires_at": None}

    si._register = slow_register
    start.wait()
    results.put(si.session_key(REF, REGISTRAR_KEY, API))


class TestMcpStartupNotice:
    def test_quiet_when_off_or_in_a_session(self, home, monkeypatch):
        assert si.missing_session_notice() is None
        monkeypatch.setenv(si.MODE_ENV, "auto")
        monkeypatch.setenv(si.SESSION_ENV, SESSION_ID)
        assert si.missing_session_notice() is None

    def test_warns_when_auto_has_no_session_id(self, home, monkeypatch):
        monkeypatch.setenv(si.MODE_ENV, "auto")
        assert "CLAUDE_CODE_SESSION_ID is not set" in si.missing_session_notice()

    def test_reports_an_invalid_mode(self, home, monkeypatch):
        monkeypatch.setenv(si.MODE_ENV, "sometimes")
        assert "must be 'auto' or 'off'" in si.missing_session_notice()

    def test_mcp_command_prints_it_on_stderr(self, home, monkeypatch, capsys):
        import click

        from cli.commands import mcp_cmd

        monkeypatch.setenv(si.MODE_ENV, "auto")
        group = click.Group()
        mcp_cmd.register(group)
        with patch("cli.mcp_server.serve") as serve:
            group.commands["mcp"].callback()
        serve.assert_called_once()
        captured = capsys.readouterr()
        assert "CLAUDE_CODE_SESSION_ID is not set" in captured.err and captured.out == ""


class TestCacheErrors:
    def test_an_unwritable_cache_is_a_clean_error(self, auto, server, configured, home):
        (home / "sessions").mkdir(mode=0o700)
        lock = si.cache_path(REF).with_suffix(".lock")
        lock.symlink_to(home / "elsewhere")
        with pytest.raises(APIError, match="cannot use the key cache"):
            Client()._request("GET", "/issues")
        assert server.registrations == []
