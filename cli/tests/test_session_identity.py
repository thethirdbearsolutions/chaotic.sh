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
_REAL_GET_CURRENT_TEAM = cli_config.get_current_team


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
        self.registrar_keys = {REGISTRAR_KEY}
        self.names: dict[str, str] = {}
        self.sent_headers: list[dict] = []

    # A cloud environment's proxy injecting the registrar key as a network
    # secret (CHT-1906): set to a key to add X-Chaotic-Registrar-Key to
    # every request, which the server reads on /agents/register only.
    proxy_registrar_key: str | None = None

    def presented(self, request: httpx.Request) -> str:
        """The key the server would see. With a proxy (header mode) the
        client's Authorization is dropped, as the real cloud proxy does on
        a host it injects a secret for (CHT-1913); X-Chaotic-Key passes."""
        if self.proxy_registrar_key:
            return request.headers.get(si.KEY_HEADER, "")
        # Local mode: only Authorization counts, so a regression that sent
        # the key header here would fail every local-mode test (review L4).
        return request.headers.get("Authorization", "").removeprefix("Bearer ")

    def handler(self, request: httpx.Request) -> httpx.Response:
        bearer = self.presented(request)
        path = request.url.path.removeprefix("/api")
        assert si.REGISTRAR_KEY_HEADER.lower() not in {h.lower() for h in request.headers}, \
            "the CLI never sends the registrar header itself"
        with self.lock:
            self.requests.append((request.method, path, bearer))
            self.sent_headers.append({k.lower(): v for k, v in request.headers.items()})
        if path == "/agents/register" and self.proxy_registrar_key:
            bearer = self.proxy_registrar_key
        if path == "/auth/me" and bearer in self.registrar_keys:
            return httpx.Response(200, json=self.me)
        if path == "/agents/register":
            assert bearer in self.registrar_keys
            body = json.loads(request.content)
            # Each registrar has its own identity for the ref (another
            # team, in the real server).
            identity = (
                "sess-1" if (bearer, request.url.host) == (REGISTRAR_KEY, "chaotic.test")
                else f"sess-{bearer}" if request.url.host == "chaotic.test"
                else f"sess-{request.url.host}"
            ) + (f"-{body['team_id']}" if body.get("team_id") else "")  # a person's: per team
            with self.lock:
                self.registrations.append(body)
                if self.register_status >= 400:
                    return httpx.Response(self.register_status, json={"detail": self.register_detail})
                # One live key per identity: registering revokes the others.
                self.live_keys = {k: a for k, a in self.live_keys.items() if a != identity}
                key = f"ck_session_{next(self._n)}"
                self.live_keys[key] = identity
            return httpx.Response(201, json={
                "agent": {"id": identity, "name": self._name(identity, body),
                          "kind": "session", "external_ref": body["external_ref"]},
                "created": len(self.registrations) == 1,
                "api_key": key,
                "api_key_id": f"kid-{key}",
                "expires_at": (datetime.now(timezone.utc) + self.expires_in).isoformat(),
            })
        if bearer in self.registrar_keys:
            if request.method == "GET":
                return httpx.Response(200, json={"as": "registrar"})
            return httpx.Response(403, json={"detail": {"error_code": "registrar_cannot_write",
                                                        "message": "This agent is a registrar"}})
        if bearer in self.live_keys:
            return httpx.Response(200, json={"as": self.live_keys[bearer], "key": bearer})
        return httpx.Response(401, json={"detail": "Could not validate credentials"})

    def _name(self, identity, body):
        """The server's rule: `name` renames, `default_name` only names a
        new identity."""
        if body.get("name"):
            self.names[identity] = body["name"]
        else:
            self.names.setdefault(identity, body.get("default_name") or "Claude Code · 00000001")
        return self.names[identity]

    def revoke_all(self):
        self.live_keys.clear()

    def sent_with(self, key):
        return [r for r in self.requests if r[2] == key]


@pytest.fixture
def home(tmp_path, monkeypatch):
    monkeypatch.setattr(cli_config, "GLOBAL_CONFIG_DIR", tmp_path)
    monkeypatch.setattr(cli_config, "_current_profile", None)
    monkeypatch.delenv("CHAOTIC_PROFILE", raising=False)
    monkeypatch.delenv(si.NAME_ENV, raising=False)
    # No repository .chaotic unless a test writes one.
    monkeypatch.setattr(cli_config, "load_local_config", lambda: {})
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


def _set_profile(monkeypatch, key=REGISTRAR_KEY, url=API, team="team-1"):
    """The profile as both readers see it: the plain CLI path
    (cli.client getters) and session identity (environment, profile)."""
    for env in ("CHAOTIC_API_KEY", "CHAOTIC_TOKEN"):
        monkeypatch.delenv(env, raising=False)
    if key:
        monkeypatch.setenv("CHAOTIC_API_KEY", key)
    monkeypatch.setenv("CHAOTIC_API_URL", url)
    monkeypatch.setattr("cli.client.get_api_url", lambda: url)
    monkeypatch.setattr("cli.client.get_api_key", lambda: key)
    monkeypatch.setattr("cli.client.get_token", lambda: None)
    monkeypatch.setattr("cli.config.get_current_team", lambda: team)


@pytest.fixture
def configured(monkeypatch):
    _set_profile(monkeypatch)


def _cache(url=API, key=REGISTRAR_KEY, team=None):
    """The slot. An agent registrar's leaves the team out; pass `team`
    for a person's."""
    return si.cache_path(REF, url, si.fingerprint(key), team)


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
        head, tail = body["default_name"].rsplit(" · ", 1)
        assert head == "Claude Code · cht-1499"
        # A random tail, nothing of the ref (CHT-1869).
        assert len(tail) == 6 and int(tail, 16) >= 0
        assert tail not in REF
        assert "name" not in body  # never renames an existing identity
        assert "team_id" not in body  # an agent registrar registers in its own team
        # The write went with the session key, never with the registrar's.
        assert [r for r in server.sent_with(REGISTRAR_KEY) if r[1] not in ("/auth/me", "/agents/register")] == []

        record = json.loads(_cache().read_text())
        assert record["external_ref"] == REF and record["api_url"] == API
        assert record["api_key"] == result["key"]
        assert REGISTRAR_KEY not in _cache().read_text()
        assert stat.S_IMODE(_cache().stat().st_mode) == 0o600
        assert stat.S_IMODE((home / "sessions").stat().st_mode) == 0o700
        slot = "\n".join((REF, API, si.fingerprint(REGISTRAR_KEY), ""))
        assert _cache().name == f"{__import__('hashlib').sha256(slot.encode()).hexdigest()[:16]}.json"

    def test_local_mode_sends_authorization_not_the_key_header(self, auto, server, configured):
        key = Client()._request("GET", "/issues")["key"]
        last = server.sent_headers[-1]
        assert last.get("authorization") == f"Bearer {key}" and "x-chaotic-key" not in last

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
        assert "name" not in server.registrations[1]  # only default_name: never a rename
        assert json.loads(_cache().read_text())["api_key"] == new
        # Each registration sends a freshly drawn tail, and only the first
        # names the identity (the server's rule, CHT-1869).
        assert server.names["sess-1"] == server.registrations[0]["default_name"]

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

    def test_a_person_without_a_team_fails_loudly(self, auto, server, monkeypatch):
        server.me = {"id": "u-1", "name": "Ada", "is_agent": False}
        _set_profile(monkeypatch, team=None)
        with pytest.raises(APIError, match="no team is selected"):
            Client()._request("GET", "/issues")
        assert server.registrations == []

    def test_a_person_switching_teams_gets_each_teams_identity(self, auto, server, monkeypatch):
        server.me = {"id": "u-1", "name": "Ada", "is_agent": False}
        _set_profile(monkeypatch, team="team-A")
        a = Client()._request("GET", "/issues")["key"]
        _set_profile(monkeypatch, team="team-B")
        Client()._request("GET", "/issues")
        assert [r["team_id"] for r in server.registrations] == ["team-A", "team-B"]
        assert json.loads(_cache(team="team-A").read_text())["api_key"] == a
        assert json.loads(_cache(team="team-B").read_text())["team_id"] == "team-B"


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

    def test_a_rejected_registrar_key(self, auto, server, monkeypatch):
        _set_profile(monkeypatch, key="ck_wrong")
        with pytest.raises(APIError, match="configured key was rejected") as refused:
            Client()._request("GET", "/issues")
        assert refused.value.status_code == 401
        assert "revoked or its holder deactivated" in str(refused.value)

    def test_no_registrar_key(self, auto, server, monkeypatch):
        _set_profile(monkeypatch, key=None)
        with pytest.raises(APIError, match="no registrar key"):
            Client()._request("GET", "/issues")

    def test_the_not_a_registrar_hint_names_who_runs_it_and_how(self, auto, server, configured):
        server.me = {"id": "a-1", "name": "claude-bot", "is_agent": True, "can_register": False}
        with pytest.raises(APIError) as refused:
            Client()._request("GET", "/issues")
        message = str(refused.value)
        assert "creator or a team admin" in message
        assert "CHAOTIC_SESSION_IDENTITY=off chaotic agent update 'claude-bot' --registrar" in message

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

    def test_a_fifo_in_the_slot_does_not_hang(self, auto, server, configured, home):
        (home / "sessions").mkdir(mode=0o700)
        os.mkfifo(_cache(), 0o600)
        assert si.read_cache(_cache()) is None  # returns at once, with no writer
        assert Client()._request("GET", "/issues")["as"] == "sess-1"
        assert stat.S_ISREG(_cache().stat().st_mode)  # replaced by a real cache file

    def test_a_non_regular_file_is_not_read(self, auto, server, configured, home):
        (home / "sessions").mkdir(mode=0o700)
        _cache().mkdir(mode=0o700)
        assert si.read_cache(_cache()) is None

    def test_a_hit_in_an_untrusted_directory_is_not_used(self, auto, server, configured, home):
        self._seed(server)
        os.chmod(home / "sessions", 0o777)
        assert si.read_cache(_cache()) is None
        Client()._request("GET", "/issues")  # tightens the directory, registers again
        assert len(server.registrations) == 2
        assert stat.S_IMODE((home / "sessions").stat().st_mode) == 0o700

    def test_a_hit_through_a_symlinked_directory_is_not_used(self, auto, server, configured, home, tmp_path_factory):
        self._seed(server)
        elsewhere = tmp_path_factory.mktemp("moved")
        (home / "sessions").rename(elsewhere / "sessions")
        (home / "sessions").symlink_to(elsewhere / "sessions")
        assert si.read_cache(_cache()) is None
        with pytest.raises(APIError, match="must be a directory"):
            Client()._request("GET", "/issues")


class TestSlots:
    """One slot per (session, server, registrar, team): switching between
    them in one session must not re-register (which revokes the other's
    key and spends the registrar's hourly cap)."""

    def test_two_registrars_in_one_session_keep_their_own_keys(self, auto, server, monkeypatch):
        _set_profile(monkeypatch, key=REGISTRAR_KEY)
        Client()._request("GET", "/issues")
        server.registrar_keys.add("ck_registrar_two")
        _set_profile(monkeypatch, key="ck_registrar_two")
        assert Client()._request("GET", "/issues")["as"] == "sess-ck_registrar_two"
        first_body, second_body = server.registrations
        # A different registrar's identity gets its own default name,
        # not treated as a renewal of the other registrar's identity.
        assert "default_name" in second_body

        _set_profile(monkeypatch, key=REGISTRAR_KEY)
        Client()._request("GET", "/issues")
        _set_profile(monkeypatch, key="ck_registrar_two")
        Client()._request("GET", "/issues")
        assert len(server.registrations) == 2
        assert _cache(key=REGISTRAR_KEY) != _cache(key="ck_registrar_two")

    def test_two_servers_in_one_session_keep_their_own_keys(self, auto, server, monkeypatch):
        _set_profile(monkeypatch, url=API)
        Client()._request("GET", "/issues")
        _set_profile(monkeypatch, url="http://other.test/api")
        Client()._request("GET", "/issues")
        _set_profile(monkeypatch, url=API)
        Client()._request("GET", "/issues")
        assert len(server.registrations) == 2
        assert json.loads(_cache().read_text())["api_url"] == API
        assert json.loads(_cache(url="http://other.test/api").read_text())["api_url"] == "http://other.test/api"


class TestRepositoryConfig:
    """The registrar key and server come from the profile or the
    environment, never a repository's .chaotic."""

    def test_a_repo_key_is_refused_not_used(self, auto, server, configured, monkeypatch):
        monkeypatch.delenv("CHAOTIC_API_KEY")
        monkeypatch.setattr(cli_config, "load_global_config", lambda: {"api_key": REGISTRAR_KEY})
        monkeypatch.setattr(cli_config, "load_local_config", lambda: {"api_key": "ck_from_repo"})
        with pytest.raises(APIError, match=r"\.chaotic sets its own api_key"):
            Client()._request("GET", "/issues")
        assert server.requests == []

    def test_a_repo_url_is_refused(self, auto, server, configured, monkeypatch):
        monkeypatch.delenv("CHAOTIC_API_URL")
        monkeypatch.setattr(cli_config, "load_local_config", lambda: {"api_url": "http://evil.test/api"})
        with pytest.raises(APIError, match="sets its own api_url"):
            Client()._request("GET", "/issues")
        assert server.requests == []

    def test_the_environment_wins_over_a_repo_value(self, auto, server, configured, monkeypatch):
        monkeypatch.setattr(cli_config, "load_local_config", lambda: {"api_key": "ck_from_repo"})
        assert Client()._request("GET", "/issues")["as"] == "sess-1"

    def test_a_repo_value_equal_to_the_profile_is_fine(self, auto, server, configured, monkeypatch):
        monkeypatch.delenv("CHAOTIC_API_KEY")
        monkeypatch.delenv("CHAOTIC_API_URL")
        profile = {"api_key": REGISTRAR_KEY, "api_url": API}
        monkeypatch.setattr(cli_config, "load_global_config", lambda: dict(profile))
        monkeypatch.setattr(cli_config, "load_local_config", lambda: {**profile, "current_team": "team-1"})
        assert Client()._request("GET", "/issues")["as"] == "sess-1"


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

    cli_config.get_current_team = lambda: "team-1"

    si._whoami = lambda credential, api_url: {"is_agent": True, "can_register": True, "name": "R"}

    def slow_register(ref, credential, api_url, team_id, me):
        with open(log, "a") as f:
            f.write(f"{os.getpid()}\n")
        time.sleep(0.3)
        return {"external_ref": ref, "api_url": api_url, "registrar": si.fingerprint(credential), "team_id": team_id,
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
        lock = _cache().with_suffix(".lock")
        lock.symlink_to(home / "elsewhere")
        with pytest.raises(APIError, match="cannot use the key cache"):
            Client()._request("GET", "/issues")
        assert server.registrations == []


class TestTeamSwitches:
    """An agent registrar registers in its own team whatever the local
    current team says, so switching it (`team use`, another directory's
    .chaotic) must not register again: that would revoke the other
    slot's key and spend the registrar's hourly cap (review R1)."""

    def test_an_agent_registrar_ignores_the_local_team(self, auto, server, monkeypatch):
        keys = []
        for team in ("team-1", "team-2", None, "team-1", "team-2"):
            _set_profile(monkeypatch, team=team)
            keys.append(Client()._request("GET", "/issues")["key"])
        assert len(server.registrations) == 1
        assert len(set(keys)) == 1
        assert len(server.live_keys) == 1
        assert "team_id" not in server.registrations[0]

    def test_a_person_registrar_alternating_teams_registers_once_per_team(self, auto, server, monkeypatch):
        server.me = {"id": "u-1", "name": "Ada", "is_agent": False}
        for team in ("team-A", "team-B", "team-A", "team-B"):
            _set_profile(monkeypatch, team=team)
            Client()._request("GET", "/issues")
        assert [r["team_id"] for r in server.registrations] == ["team-A", "team-B"]


class TestRenamesSurvive:
    """A new slot for the same identity (a person's fresh login, a
    rotated registrar key) must not undo a rename (review R2)."""

    def test_a_rename_survives_a_new_slot(self, auto, server, configured, monkeypatch):
        Client()._request("GET", "/issues")
        server.names["sess-1"] = "Renamed by hand"
        # Rotated registrar key: same registrar agent, new fingerprint.
        server.registrar_keys.add("ck_rotated")
        original = server.handler

        def same_registrar(request):
            if request.headers.get("Authorization") == "Bearer ck_rotated":
                request.headers["Authorization"] = f"Bearer {REGISTRAR_KEY}"
            return original(request)

        server.handler = same_registrar
        _set_profile(monkeypatch, key="ck_rotated")
        Client()._request("GET", "/issues")
        assert len(server.registrations) == 2
        assert server.names["sess-1"] == "Renamed by hand"
        assert all("name" not in body for body in server.registrations)


class TestChosenName:
    """CHAOTIC_SESSION_NAME names a new identity, and only a new one (CHT-1918)."""

    def test_it_goes_as_the_default_name(self, auto, server, configured, monkeypatch):
        monkeypatch.setenv(si.NAME_ENV, "  Piper ")
        Client()._request("GET", "/issues")
        assert server.registrations[0]["default_name"] == "Piper"
        assert "name" not in server.registrations[0]  # never a rename
        assert server.names["sess-1"] == "Piper"

    def test_a_later_registration_keeps_the_first_name(self, auto, server, configured, monkeypatch):
        monkeypatch.setenv(si.NAME_ENV, "Piper")
        Client()._request("GET", "/issues")
        server.revoke_all()
        monkeypatch.setenv(si.NAME_ENV, "Weir")
        Client()._request("GET", "/issues")
        assert len(server.registrations) == 2
        assert server.names["sess-1"] == "Piper"

    def test_blank_is_unset(self, auto, server, configured, monkeypatch):
        monkeypatch.setenv(si.NAME_ENV, "   ")
        with patch("cli.session_identity._workspace_label", return_value="b"):
            Client()._request("GET", "/issues")
        assert server.registrations[0]["default_name"].startswith("Claude Code · b · ")

    def test_too_long_fails_loudly(self, auto, server, configured, monkeypatch):
        monkeypatch.setenv(si.NAME_ENV, "x" * (si.NAME_MAX + 1))
        with pytest.raises(APIError, match=si.NAME_ENV):
            Client()._request("GET", "/issues")
        assert server.registrations == []

    def test_header_mode_sends_it_too(self, proxied, monkeypatch):
        monkeypatch.setenv(si.NAME_ENV, "Piper")
        Client()._request("GET", "/issues")
        assert proxied.registrations == [{"external_ref": REF, "default_name": "Piper"}]


class TestRepositoryUrlNormalised:
    """The .chaotic check compares what values mean (review R3)."""

    def test_the_default_url_spelled_out_is_not_a_conflict(self, auto, server, configured, monkeypatch):
        monkeypatch.delenv("CHAOTIC_API_URL")
        monkeypatch.setattr(cli_config, "load_global_config", lambda: {})
        monkeypatch.setattr(
            cli_config, "load_local_config",
            lambda: {"api_url": f"http://localhost:{cli_config.DEFAULT_PORT}/api/"},
        )
        assert si.registrar_settings()[1] == f"http://localhost:{cli_config.DEFAULT_PORT}/api"

    def test_a_trailing_slash_is_the_same_server(self, auto, server, configured, monkeypatch):
        monkeypatch.delenv("CHAOTIC_API_URL")
        monkeypatch.setattr(cli_config, "load_global_config", lambda: {"api_url": API + "/"})
        monkeypatch.setattr(cli_config, "load_local_config", lambda: {"api_url": API})
        assert si.registrar_settings()[1] == API


class TestMcpDefaultTeam:
    """`chaotic mcp` from env vars alone has no current team; it uses the
    key's only team (CHT-1687). The teams are listed with the registrar
    key, before any session key exists, and the session identity is
    registered in that team."""

    @pytest.fixture
    def teams_server(self, server, monkeypatch):
        _set_profile(monkeypatch, team=None)
        # The real getter: no repository .chaotic, an empty profile, then
        # the process default.
        monkeypatch.setattr("cli.config.get_current_team", _REAL_GET_CURRENT_TEAM)
        import cli.main as m
        monkeypatch.setattr(m, "get_current_team", _REAL_GET_CURRENT_TEAM)
        monkeypatch.setattr(m, "client", Client())
        base = server.handler
        server.teams = [{"id": "team-only", "name": "Demo", "key": "DEMO"}]
        server.teams_status = 200
        server.refused = []

        def handler(request):
            bearer = request.headers.get("Authorization", "").removeprefix("Bearer ")
            if request.url.path == "/api/teams" and bearer in server.registrar_keys:
                server.requests.append((request.method, "/teams", bearer))
                if server.teams_status != 200:
                    return httpx.Response(server.teams_status, json={"detail": "unavailable"})
                return httpx.Response(200, json=server.teams)
            if request.url.path == "/api/agents/register":
                team = json.loads(request.content).get("team_id")
                if team and team not in {t["id"] for t in server.teams}:
                    # The server's rule: a person registers only in a team
                    # they are a member of.
                    server.requests.append((request.method, "/agents/register", bearer))
                    server.refused.append(team)
                    return httpx.Response(403, json={"detail": "Not a member of this team"})
            return base(request)

        server.handler = handler
        return server

    async def test_a_person_registrar_registers_in_the_keys_only_team(self, auto, teams_server):
        from cli.mcp_backend import RestBackend
        teams_server.me = {"id": "u-1", "name": "Ada", "is_agent": False}
        assert await RestBackend().resolve_team(None) == "team-only"
        assert teams_server.requests[0] == ("GET", "/teams", REGISTRAR_KEY)
        assert teams_server.registrations == []
        Client()._request("GET", "/issues")
        assert teams_server.registrations[0]["team_id"] == "team-only"

    async def test_a_person_registrar_whose_first_call_needs_no_team(self, auto, teams_server):
        """issue_view, issue_comment, inbox_*, ritual_*, sprint_* never
        resolve a team before their first request; the session key must
        still register in the only team (review M1)."""
        from cli.mcp_backend import RestBackend
        teams_server.me = {"id": "u-1", "name": "Ada", "is_agent": False}
        assert (await RestBackend().get_issue("DEMO-1"))["as"] == "sess-1-team-only"
        assert teams_server.registrations[0]["team_id"] == "team-only"
        # Known from then on: no more /auth/me or /teams, one registration.
        before = len(teams_server.requests)
        await RestBackend().get_issue("DEMO-2")
        assert [r[1] for r in teams_server.requests[before:]] == ["/issues/identifier/DEMO-2"]
        assert await RestBackend().resolve_team(None) == "team-only"
        assert len(teams_server.registrations) == 1

    def test_a_person_registrar_in_several_teams_is_told_to_choose(self, auto, teams_server):
        teams_server.me = {"id": "u-1", "name": "Ada", "is_agent": False}
        teams_server.teams.append({"id": "team-2", "name": "Beta", "key": "BET"})
        with pytest.raises(APIError, match=r"several teams \(Demo \(DEMO\), Beta \(BET\)\)"):
            Client()._request("GET", "/issues")
        assert teams_server.registrations == []

    def test_the_plain_cli_registers_in_the_only_team_without_adopting_it(self, auto, teams_server):
        teams_server.me = {"id": "u-1", "name": "Ada", "is_agent": False}
        Client()._request("GET", "/issues")
        assert teams_server.registrations[0]["team_id"] == "team-only"
        assert cli_config.get_current_team() is None

    async def test_one_teams_lookup_per_process_shared_with_the_mcp_default(self, auto, teams_server):
        """CHT-1691 N2: session identity listed the registrar's teams for
        the first call; the MCP default team then uses that answer."""
        from cli.mcp_backend import RestBackend
        teams_server.me = {"id": "u-1", "name": "Ada", "is_agent": False}
        await RestBackend().get_issue("DEMO-1")
        assert await RestBackend().resolve_team(None) == "team-only"
        assert [r for r in teams_server.requests if r[1] == "/teams"] == [("GET", "/teams", REGISTRAR_KEY)]

    async def test_the_mcp_default_is_seen_by_session_identity_without_a_second_lookup(self, auto, teams_server):
        from cli.mcp_backend import RestBackend
        teams_server.me = {"id": "u-1", "name": "Ada", "is_agent": False}
        assert await RestBackend().resolve_team(None) == "team-only"
        await RestBackend().get_issue("DEMO-1")
        assert [r[1] for r in teams_server.requests].count("/teams") == 1

    def _new_process(self):
        """What a fresh `chaotic` process starts with: no in-memory team."""
        cli_config._only_teams.clear()
        cli_config._process_teams.clear()

    def test_a_later_cli_process_finds_the_session_key_without_asking_again(self, auto, teams_server):
        """CHT-1691 N1: the team a person registrar with no current team
        registered in is remembered for the session, so the next process
        goes straight to the cached key."""
        teams_server.me = {"id": "u-1", "name": "Ada", "is_agent": False}
        Client()._request("GET", "/issues")
        self._new_process()
        before = len(teams_server.requests)

        assert Client()._request("GET", "/issues")["as"] == "sess-1-team-only"
        assert [r[1] for r in teams_server.requests[before:]] == ["/issues"]
        assert len(teams_server.registrations) == 1
        assert cli_config.get_current_team() is None  # remembered, not adopted
        hint = si.team_hint_path(REF, API, si.fingerprint(REGISTRAR_KEY))
        assert stat.S_IMODE(os.stat(hint).st_mode) == 0o600

    def test_the_remembered_team_is_asked_again_after_a_refused_key(self, auto, teams_server):
        """The person may have left that team: a 401 re-resolves it."""
        teams_server.me = {"id": "u-1", "name": "Ada", "is_agent": False}
        Client()._request("GET", "/issues")
        self._new_process()
        teams_server.teams[:] = [{"id": "team-new", "name": "New", "key": "NEW"}]
        teams_server.revoke_all()
        before = len(teams_server.requests)

        assert Client()._request("GET", "/issues")["as"] == "sess-1-team-new"
        assert "/teams" in [r[1] for r in teams_server.requests[before:]]
        assert teams_server.registrations[-1]["team_id"] == "team-new"
        # And the new team is what later processes use.
        self._new_process()
        before = len(teams_server.requests)
        assert Client()._request("GET", "/issues")["as"] == "sess-1-team-new"
        assert [r[1] for r in teams_server.requests[before:]] == ["/issues"]

    def _moved_to_a_new_team(self, server):
        server.teams[:] = [{"id": "team-new", "name": "New", "key": "NEW"}]

    def test_a_stale_hint_with_no_usable_key_looks_the_team_up(self, auto, teams_server):
        """Review M1: the session's key in the remembered team expired (its
        slot is gone); nothing was refused, so the hint must not choose the
        team to register in."""
        teams_server.me = {"id": "u-1", "name": "Ada", "is_agent": False}
        Client()._request("GET", "/issues")
        self._new_process()
        self._moved_to_a_new_team(teams_server)
        fp = si.fingerprint(REGISTRAR_KEY)
        si.cache_path(REF, API, fp, "team-only").unlink()

        assert Client()._request("GET", "/issues")["as"] == "sess-1-team-new"
        assert [r["team_id"] for r in teams_server.registrations] == ["team-only", "team-new"]
        assert teams_server.refused == []
        assert si._hinted_team(REF, API, fp) == "team-new"

    def test_an_expired_key_in_the_remembered_team_looks_the_team_up(self, auto, teams_server):
        teams_server.me = {"id": "u-1", "name": "Ada", "is_agent": False}
        teams_server.expires_in = timedelta(seconds=1)  # inside EXPIRY_MARGIN: never usable
        Client()._request("GET", "/issues")
        self._new_process()
        self._moved_to_a_new_team(teams_server)

        assert Client()._request("GET", "/issues")["as"] == "sess-1-team-new"
        assert teams_server.refused == []

    def test_a_refused_key_in_the_same_process_lists_the_teams_again(self, auto, teams_server):
        """Review M2: within one process (a long-running `chaotic mcp`), the
        lookup memo is forgotten after a 401 too, not only the hint."""
        teams_server.me = {"id": "u-1", "name": "Ada", "is_agent": False}
        Client()._request("GET", "/issues")
        self._moved_to_a_new_team(teams_server)
        teams_server.revoke_all()
        before = len(teams_server.requests)

        assert Client()._request("GET", "/issues")["as"] == "sess-1-team-new"
        assert "/teams" in [r[1] for r in teams_server.requests[before:]]
        assert teams_server.refused == []
        assert teams_server.registrations[-1]["team_id"] == "team-new"
        assert cli_config.known_only_team(API, REGISTRAR_KEY) == "team-new"

    async def test_a_refused_key_under_the_mcp_default_team_lists_the_teams_again(self, auto, teams_server):
        """Review M2 in `chaotic mcp` itself: the default team the server
        took (the key's only team) goes with the memo after a 401."""
        from cli.mcp_backend import RestBackend
        teams_server.me = {"id": "u-1", "name": "Ada", "is_agent": False}
        assert await RestBackend().resolve_team(None) == "team-only"
        await RestBackend().get_issue("DEMO-1")
        self._moved_to_a_new_team(teams_server)
        teams_server.revoke_all()

        assert (await RestBackend().get_issue("DEMO-2"))["as"] == "sess-1-team-new"
        assert teams_server.refused == []
        assert await RestBackend().resolve_team(None) == "team-new"

    async def test_a_team_chosen_with_team_use_is_kept_even_when_it_is_the_mcp_default(
            self, auto, teams_server, monkeypatch):
        """Re-review L1: `chaotic mcp` defaulted to T, then the person ran
        `chaotic team use T` and later joined U. After a 401 the chosen
        team still wins; nothing asks which team to use."""
        from cli.mcp_backend import RestBackend
        teams_server.me = {"id": "u-1", "name": "Ada", "is_agent": False}
        assert await RestBackend().resolve_team(None) == "team-only"
        await RestBackend().get_issue("DEMO-1")
        monkeypatch.setattr(cli_config, "load_config", lambda: {"current_team": "team-only"})
        teams_server.teams.append({"id": "team-2", "name": "Beta", "key": "BET"})
        teams_server.revoke_all()
        before = len(teams_server.requests)

        assert (await RestBackend().get_issue("DEMO-2"))["as"] == "sess-1-team-only"
        assert "/teams" not in [r[1] for r in teams_server.requests[before:]]
        assert teams_server.registrations[-1]["team_id"] == "team-only"

    @pytest.mark.parametrize("status", [429, 500, 503])
    def test_a_transient_registration_failure_keeps_the_team(self, auto, teams_server, status):
        """Re-review N1: only a definitive refusal says the team is wrong."""
        teams_server.me = {"id": "u-1", "name": "Ada", "is_agent": False}
        fp = si.fingerprint(REGISTRAR_KEY)
        Client()._request("GET", "/issues")
        si.cache_path(REF, API, fp, "team-only").unlink()
        teams_server.register_status = status

        with pytest.raises(si.SessionIdentityError):
            si.session_key(REF, REGISTRAR_KEY, API)
        assert si._hinted_team(REF, API, fp) == "team-only"
        assert cli_config.known_only_team(API, REGISTRAR_KEY) == "team-only"

    def test_a_refused_registration_forgets_the_team(self, auto, teams_server):
        """The registration in a looked-up team is refused (the person was
        removed between the list and the registration): neither the hint
        nor the memo keeps it."""
        teams_server.me = {"id": "u-1", "name": "Ada", "is_agent": False}
        fp = si.fingerprint(REGISTRAR_KEY)
        Client()._request("GET", "/issues")
        teams_server.teams[:] = []  # removed from every team; the memo still says team-only
        si.cache_path(REF, API, fp, "team-only").unlink()  # and its key is gone

        with pytest.raises(si.SessionIdentityError):
            si.session_key(REF, REGISTRAR_KEY, API)
        assert teams_server.refused == ["team-only"]
        assert not si.team_hint_path(REF, API, fp).exists()
        assert cli_config.known_only_team(API, REGISTRAR_KEY) is None

    async def test_the_hint_is_written_when_the_mcp_default_found_the_team(self, auto, teams_server):
        """Review L1: the MCP server's first call was team-scoped, so the
        team came from the shared memo, not session identity's lookup."""
        from cli.mcp_backend import RestBackend
        teams_server.me = {"id": "u-1", "name": "Ada", "is_agent": False}
        assert await RestBackend().resolve_team(None) == "team-only"
        await RestBackend().get_issue("DEMO-1")
        self._new_process()
        before = len(teams_server.requests)

        Client()._request("GET", "/issues")
        assert [r[1] for r in teams_server.requests[before:]] == ["/issues"]

    def test_a_failed_teams_lookup_is_not_remembered(self, auto, teams_server):
        teams_server.me = {"id": "u-1", "name": "Ada", "is_agent": False}
        teams_server.teams_status = 503
        with pytest.raises(APIError):
            Client()._request("GET", "/issues")
        assert cli_config.known_only_team(API, REGISTRAR_KEY) is None

        teams_server.teams_status = 200
        assert Client()._request("GET", "/issues")["as"] == "sess-1-team-only"
        assert [r[1] for r in teams_server.requests].count("/teams") == 2

    def test_a_hint_for_another_slot_is_ignored(self, auto, teams_server):
        teams_server.me = {"id": "u-1", "name": "Ada", "is_agent": False}
        fp = si.fingerprint(REGISTRAR_KEY)
        si._ensure_dir()
        si.write_cache(si.team_hint_path(REF, API, fp),
                       {"external_ref": "other", "api_url": API, "registrar": fp, "team_id": "team-x"})
        Client()._request("GET", "/issues")
        assert teams_server.registrations[0]["team_id"] == "team-only"

    async def test_an_agent_registrar(self, auto, teams_server):
        from cli.mcp_backend import RestBackend
        assert await RestBackend().resolve_team(None) == "team-only"
        assert teams_server.requests[0] == ("GET", "/teams", REGISTRAR_KEY)
        assert Client()._request("GET", "/issues")["as"] == "sess-1"
        assert "team_id" not in teams_server.registrations[0]



@pytest.fixture
def proxied(monkeypatch, home, server):
    """Header mode in a cloud environment: no key configured here, the
    proxy supplies the registrar's (CHT-1906)."""
    monkeypatch.setenv(si.MODE_ENV, "auto")
    monkeypatch.setenv(si.SESSION_ENV, SESSION_ID)
    monkeypatch.setenv(si.VIA_ENV, "header")
    _set_profile(monkeypatch, key=None)
    server.proxy_registrar_key = REGISTRAR_KEY
    return server


def _header_cache(url=API):
    return si.cache_path(REF, url, si.HEADER_FP, None)


class TestRegistrarKeyViaHeader:
    def test_registers_without_a_local_key_and_writes_as_the_session(self, proxied, home):
        result = Client()._request("POST", "/issues", {"title": "x"})

        assert result["as"] == "sess-1"
        assert proxied.registrations == [{"external_ref": REF}]  # the server names it after the registrar
        register = [r for r in proxied.requests if r[1] == "/agents/register"]
        assert register == [("POST", "/agents/register", "")]  # no Authorization: the proxy's header is it
        assert not [r for r in proxied.requests if r[1] == "/auth/me"]
        writes = [r for r in proxied.requests if r[1] == "/issues"]
        assert writes == [("POST", "/issues", result["key"])]
        # The session key went in X-Chaotic-Key, with no Authorization for
        # the proxy to drop (CHT-1913).
        assert proxied.sent_headers and all("authorization" not in h for h in proxied.sent_headers)
        assert proxied.sent_headers[-1].get("x-chaotic-key") == result["key"]
        record = json.loads(_header_cache().read_text())
        assert record["api_key"] == result["key"] and record["registrar"] == si.HEADER_FP
        assert stat.S_IMODE(_header_cache().stat().st_mode) == 0o600

    def test_later_requests_reuse_the_cache_and_a_401_re_registers(self, proxied):
        first = Client()._request("GET", "/issues")["key"]
        assert Client()._request("GET", "/issues")["key"] == first
        assert len(proxied.registrations) == 1
        proxied.revoke_all()
        assert Client()._request("GET", "/issues")["key"] != first
        assert len(proxied.registrations) == 2

    def test_a_locally_configured_key_is_not_the_registrar(self, proxied, monkeypatch):
        """In header mode a key configured here is not used for the
        session: register still goes without Authorization."""
        _set_profile(monkeypatch, key="ck_someone_else")
        assert Client()._request("GET", "/issues")["as"] == "sess-1"
        assert [r for r in proxied.requests if r[1] == "/agents/register"][0][2] == ""
        assert proxied.sent_with("ck_someone_else") == []

    def test_no_injected_header_fails_loudly_and_names_the_fix(self, proxied):
        proxied.proxy_registrar_key = None
        proxied.registrar_keys.add("")  # the fake's register asserts a registrar; let it reach the 401
        proxied.register_status, proxied.register_detail = 401, "Not authenticated"
        with pytest.raises(APIError, match="X-Chaotic-Registrar-Key") as refused:
            Client()._request("GET", "/issues")
        assert refused.value.status_code == 401
        assert si.NO_FALLBACK in str(refused.value)

    def test_has_credential_needs_no_local_key(self, proxied, monkeypatch):
        from cli import main

        monkeypatch.setattr(main, "get_api_key", lambda: None)
        monkeypatch.setattr(main, "get_token", lambda: None)
        assert main.has_credential()
        monkeypatch.delenv(si.SESSION_ENV)
        assert not main.has_credential()  # outside a session there is nothing to send
        monkeypatch.setenv(si.SESSION_ENV, SESSION_ID)
        monkeypatch.setenv(si.VIA_ENV, "local")
        assert not main.has_credential()

    def test_the_profile_setting_and_an_invalid_value(self, home, monkeypatch):
        monkeypatch.delenv(si.VIA_ENV, raising=False)
        assert si.registrar_key_via() == "local"
        si.set_registrar_key_via("header")
        assert json.loads((home / "config.json").read_text())["registrar_key_via"] == "header"
        assert si.registrar_key_via() == "header"
        monkeypatch.setenv(si.VIA_ENV, "local")
        assert si.registrar_key_via() == "local"  # the environment wins
        si.set_registrar_key_via("local")
        assert "registrar_key_via" not in json.loads((home / "config.json").read_text())
        monkeypatch.setenv(si.VIA_ENV, "proxy")
        with pytest.raises(si.SessionIdentityError, match="'local' or 'header'"):
            si.registrar_key_via()
        with pytest.raises(si.SessionIdentityError):
            si.set_registrar_key_via("proxy")

    def test_a_repository_chaotic_with_its_own_key_is_not_an_error(self, proxied, monkeypatch):
        """The local key check guards a registrar key that would be
        ignored; in header mode no local key is the registrar anyway."""
        monkeypatch.setattr(cli_config, "load_local_config", lambda: {"api_key": "ck_repo"})
        assert Client()._request("GET", "/issues")["as"] == "sess-1"

    def test_auth_whoami_runs_with_no_local_key(self, proxied, monkeypatch):
        """`require_auth` lets header mode through (CHT-1906), and whoami
        asks as the session identity."""
        from click.testing import CliRunner
        from cli.main import cli

        monkeypatch.setattr("cli.main.get_api_key", lambda: None)
        monkeypatch.setattr("cli.main.get_token", lambda: None)
        monkeypatch.setattr("cli.main.client", Client())  # not a mock another test left behind
        result = CliRunner().invoke(cli, ["auth", "whoami", "--json"])
        assert result.exit_code == 0, result.output
        assert json.loads(result.output)["as"] == "sess-1"
        me = [r for r in proxied.requests if r[1] == "/auth/me"]
        assert me and all(r[2].startswith("ck_session_") for r in me)


class TestMcpInHeaderMode:
    """`chaotic mcp` from the cloud recipe alone (CHT-1906 review M1): no
    key and no team configured. Its default team and project scope are
    asked as the session identity, the only credential there is."""

    @pytest.fixture
    def mcp(self, proxied, monkeypatch):
        monkeypatch.setattr("cli.config.get_current_team", _REAL_GET_CURRENT_TEAM)
        import cli.main as m
        monkeypatch.setattr(m, "get_current_team", _REAL_GET_CURRENT_TEAM)
        monkeypatch.setattr(m, "get_api_key", lambda: None)
        monkeypatch.setattr(m, "get_token", lambda: None)
        monkeypatch.setattr(m, "client", Client())
        monkeypatch.setattr(cli_config, "_process_teams", {})
        monkeypatch.setattr(cli_config, "_only_teams", {})
        base = proxied.handler

        def handler(request):
            bearer = proxied.presented(request)
            if request.url.path == "/api/teams" and bearer in proxied.live_keys:
                proxied.requests.append((request.method, "/teams", bearer))
                return httpx.Response(200, json=[{"id": "team-reg", "name": "Falls", "key": "FALLS"}])
            if request.url.path == "/api/auth/me" and bearer in proxied.live_keys:
                proxied.requests.append((request.method, "/auth/me", bearer))
                return httpx.Response(200, json={"id": proxied.live_keys[bearer], "is_agent": True,
                                                 "kind": "session", "agent_project_id": None})
            return base(request)

        proxied.handler = handler
        return proxied

    async def test_the_default_team_is_the_session_identitys(self, mcp):
        from cli.mcp_backend import RestBackend

        assert await RestBackend().resolve_team(None) == "team-reg"
        teams = [r for r in mcp.requests if r[1] == "/teams"]
        assert teams and all(r[2].startswith("ck_session_") for r in teams)
        # Kept for the process, keyed on the header-mode marker.
        assert cli_config.get_current_team() == "team-reg"

    async def test_a_local_personal_key_is_not_asked(self, mcp, monkeypatch):
        """Review L2: header mode never uses a key configured here inside a
        session, the MCP default team included."""
        from cli.mcp_backend import RestBackend

        monkeypatch.setenv("CHAOTIC_API_KEY", "ck_personal")
        assert await RestBackend().resolve_team(None) == "team-reg"
        assert mcp.sent_with("ck_personal") == []


def test_a_persons_key_as_the_secret_is_named(proxied):
    """Review L5: the server's "a person must name a team_id" becomes
    advice to use an agent registrar."""
    proxied.register_status = 422
    proxied.register_detail = {"error_code": "tool_input",
                               "message": "A person registering an identity must name a team_id or a project_id."}
    with pytest.raises(APIError, match="needs an agent registrar's key") as refused:
        Client()._request("GET", "/issues")
    assert refused.value.status_code == 422
