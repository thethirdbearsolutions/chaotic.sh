"""A write whose answer is lost (CHT-1957).

The client sends one Idempotency-Key per write and resends the write with
it, a bounded number of times, where that cannot do it twice. A write
left without an answer says it may have landed. Under --json every
failure is a JSON object on stdout. `chaotic await` rides out transient
read errors in its lookups, and keeps its 0/124 exit codes.
"""
import json
from unittest.mock import MagicMock, patch

import httpx
import pytest
from click.testing import CliRunner

from cli import client as client_mod
from cli.client import (
    IDEMPOTENCY_HEADER,
    READ_TIMEOUT,
    WRITE_ATTEMPTS,
    WRITE_TIMEOUT,
    APIError,
    Client,
    WriteOutcomeUnknown,
    honours_idempotency_key,
)


class Response:
    def __init__(self, status_code, body, headers=None):
        self.status_code = status_code
        self._body = body
        self.content = json.dumps(body).encode()
        self.headers = headers or {}

    @property
    def is_success(self):
        return 200 <= self.status_code < 300

    def json(self):
        return self._body


class FakeHttp:
    """httpx.Client stand-in: each call takes the next outcome (a
    Response to return, or an exception to raise) and records what it
    was sent."""

    def __init__(self, *outcomes):
        self.outcomes = list(outcomes)
        self.calls = []
        self.timeouts = []

    def __call__(self, timeout=None):  # httpx.Client(timeout=...)
        self.timeouts.append(timeout)
        return self

    def __enter__(self):
        return self

    def __exit__(self, *exc):
        return False

    def _send(self, method, url, **kwargs):
        self.calls.append((method, url, kwargs))
        outcome = self.outcomes.pop(0)
        if isinstance(outcome, Exception):
            raise outcome
        return outcome

    def __getattr__(self, name):
        if name in ("get", "post", "put", "patch", "delete"):
            return lambda url, **kw: self._send(name.upper(), url, **kw)
        raise AttributeError(name)

    def keys(self):
        return [kw["headers"].get(IDEMPOTENCY_HEADER) for _, _, kw in self.calls]


@pytest.fixture
def http(monkeypatch):
    holder = {}

    def install(*outcomes):
        fake = FakeHttp(*outcomes)
        monkeypatch.setattr(client_mod.httpx, "Client", fake)
        holder["fake"] = fake
        return fake

    monkeypatch.setattr(client_mod, "get_api_url", lambda: "http://test/api")
    monkeypatch.setattr(client_mod, "get_api_key", lambda: "k")
    sleeps = []
    monkeypatch.setattr(Client, "_sleep", staticmethod(sleeps.append))
    install.sleeps = sleeps
    return install


COMMENT = {"id": "c1", "content": "hi"}


def _timeout():
    return httpx.ReadTimeout("read timed out")


class TestOneKeyPerWrite:
    def test_a_comment_resent_after_a_lost_answer_keeps_its_key(self, http):
        fake = http(_timeout(), Response(201, COMMENT))
        assert Client().create_comment("i1", "hi") == COMMENT
        keys = fake.keys()
        assert len(keys) == 2 and keys[0] and keys[0] == keys[1]

    def test_two_writes_carry_two_keys(self, http):
        fake = http(Response(201, COMMENT), Response(201, COMMENT))
        Client().create_comment("i1", "hi")
        Client().create_comment("i1", "hi")
        first, second = fake.keys()
        assert first and second and first != second

    def test_a_read_carries_no_key_and_is_not_resent(self, http):
        fake = http(_timeout())
        with pytest.raises(httpx.ReadTimeout):
            Client().get_issue("i1")
        assert fake.keys() == [None]

    def test_writes_wait_longer_than_reads(self, http):
        fake = http(Response(200, {}), Response(201, COMMENT))
        Client().get_issue("i1")
        Client().create_comment("i1", "hi")
        assert fake.timeouts == [READ_TIMEOUT, WRITE_TIMEOUT]
        assert WRITE_TIMEOUT.read > READ_TIMEOUT.read > 5


class TestBoundedResend:
    def test_a_write_never_answered_may_have_landed(self, http):
        fake = http(*[_timeout() for _ in range(WRITE_ATTEMPTS)])
        with pytest.raises(WriteOutcomeUnknown) as exc:
            Client().create_comment("i1", "hi")
        assert len(fake.calls) == WRITE_ATTEMPTS
        assert len(set(fake.keys())) == 1
        assert "may have landed; check before retrying" in str(exc.value)
        assert exc.value.detail["error_code"] == "write_outcome_unknown"
        assert isinstance(exc.value, APIError)

    def test_a_route_without_the_key_is_not_resent_after_it_went_out(self, http):
        # A relation is not answered once per key: a resend could add it twice.
        fake = http(_timeout())
        with pytest.raises(WriteOutcomeUnknown):
            Client().create_relation("i1", "i2", "blocks")
        assert len(fake.calls) == 1

    def test_a_dropped_connection_after_sending_may_have_landed(self, http):
        fake = http(httpx.RemoteProtocolError("server disconnected"))
        with pytest.raises(WriteOutcomeUnknown):
            Client().delete_issue("i1")
        assert len(fake.calls) == 1

    def test_a_write_that_never_connected_is_resent_on_any_route(self, http):
        fake = http(httpx.ConnectError("refused"), Response(201, {"id": "r1"}))
        assert Client().create_relation("i1", "i2", "blocks") == {"id": "r1"}
        assert len(fake.calls) == 2

    def test_never_connecting_is_still_a_connect_error(self, http):
        http(*[httpx.ConnectError("refused") for _ in range(WRITE_ATTEMPTS)])
        with pytest.raises(httpx.ConnectError):
            Client().create_comment("i1", "hi")

    def test_a_lost_answer_then_no_connection_may_have_landed(self, http):
        http(_timeout(), *[httpx.ConnectError("refused") for _ in range(WRITE_ATTEMPTS - 1)])
        with pytest.raises(WriteOutcomeUnknown):
            Client().create_comment("i1", "hi")

    def test_in_flight_is_asked_again_after_its_retry_after(self, http):
        in_flight = Response(
            409, {"detail": {"error_code": "idempotency_in_flight", "message": "still"}},
            headers={"Retry-After": "3"},
        )
        fake = http(_timeout(), in_flight, Response(201, COMMENT))
        assert Client().create_comment("i1", "hi") == COMMENT
        assert len(set(fake.keys())) == 1
        assert http.sleeps == [1.0, 3.0]

    def test_a_busy_server_is_asked_again(self, http):
        busy = Response(503, {"detail": {"error_code": "idempotency_busy", "message": "busy"}})
        fake = http(busy, Response(201, COMMENT))
        assert Client().create_comment("i1", "hi") == COMMENT
        assert len(fake.calls) == 2

    def test_another_conflict_is_the_answer(self, http):
        arrears = Response(409, {"detail": {"error_code": "sprint_in_arrears", "message": "over budget"}})
        fake = http(arrears)
        with pytest.raises(APIError) as exc:
            Client().update_issue("i1", status="done")
        assert exc.value.status_code == 409
        assert len(fake.calls) == 1


class TestIdempotentRoutes:
    @pytest.mark.parametrize("method,path", [
        ("POST", "/projects/p1/issues"),
        ("PATCH", "/issues/i1"),
        ("POST", "/issues/i1/comments"),
        ("POST", "/inbox/e1/read"),
        ("POST", "/rituals/r1/complete-issue/i1"),
        ("POST", "/rituals/r1/reject-issue/i1?x=1"),
    ])
    def test_honoured(self, method, path):
        assert honours_idempotency_key(method, path)

    @pytest.mark.parametrize("method,path", [
        ("DELETE", "/issues/i1"),
        ("POST", "/issues/i1/relations"),
        ("POST", "/issues/batch-update"),
        ("PATCH", "/issues/i1/comments/c1"),
        ("POST", "/projects/p1/issues/extra"),
    ])
    def test_not_honoured(self, method, path):
        assert not honours_idempotency_key(method, path)


# ---------------------------------------------------------------------------
# --json: every failure is one JSON object on stdout
# ---------------------------------------------------------------------------


@pytest.fixture
def cli_with(http):
    """The real CLI and client over a fake transport. (Other test files
    leave a mock `client` behind on cli.main: replace it.)"""
    import importlib

    main = importlib.import_module("cli.main")

    def run(args, *outcomes):
        http(*outcomes)
        with patch.object(main, "client", Client()), \
             patch.object(main, "APIError", APIError), \
             patch.object(main, "get_token", return_value="t"), \
             patch.object(main, "get_api_key", return_value=None), \
             patch.object(main, "get_current_team", return_value="team1"), \
             patch.object(main, "get_current_project", return_value="proj1"):
            return CliRunner(env={"CHAOTIC_PROFILE": "default"}).invoke(main.cli, args)

    return run


ISSUE = {"id": "i1", "identifier": "CHT-1", "title": "T", "project_id": "proj1"}


class TestJsonFailures:
    def test_a_comment_that_may_have_landed(self, cli_with):
        result = cli_with(
            ["issue", "comment", "CHT-1", "hi", "--json"],
            Response(200, ISSUE), *[_timeout() for _ in range(WRITE_ATTEMPTS)],
        )
        assert result.exit_code == 1
        body = json.loads(result.stdout)
        assert body["error_code"] == "write_outcome_unknown"
        assert "may have landed" in body["error"]

    def test_a_create_whose_answer_came_on_the_resend_prints_the_issue(self, cli_with):
        created = {**ISSUE, "identifier": "CHT-2404"}
        result = cli_with(
            ["issue", "create", "Lost id", "--json"],
            _timeout(), Response(201, created),
        )
        assert result.exit_code == 0, result.output
        assert json.loads(result.stdout)["identifier"] == "CHT-2404"

    def test_a_read_timeout(self, cli_with):
        result = cli_with(["issue", "view", "CHT-1", "--json"], _timeout())
        assert result.exit_code == 1
        assert json.loads(result.stdout)["error_code"] == "timeout"

    def test_no_server(self, cli_with):
        result = cli_with(["issue", "view", "CHT-1", "--json"], httpx.ConnectError("refused"))
        assert result.exit_code == 1
        assert json.loads(result.stdout)["error_code"] == "connect_error"

    def test_a_server_refusal_keeps_its_code(self, cli_with):
        refusal = Response(409, {"detail": {"error_code": "sprint_in_arrears", "message": "over"}})
        result = cli_with(["issue", "comment", "CHT-1", "hi", "--json"], Response(200, ISSUE), refusal)
        assert result.exit_code == 1
        assert json.loads(result.stdout) == {"error": "over", "error_code": "sprint_in_arrears"}

    def test_anything_unexpected(self, cli_with):
        result = cli_with(["issue", "view", "CHT-1", "--json"], ValueError("boom"))
        assert result.exit_code == 1
        body = json.loads(result.stdout)
        assert body["error_code"] == "internal_error" and "boom" in body["error"]

    def test_without_json_the_message_says_check_first(self, cli_with):
        result = cli_with(
            ["issue", "comment", "CHT-1", "hi"],
            Response(200, ISSUE), *[_timeout() for _ in range(WRITE_ATTEMPTS)],
        )
        assert result.exit_code == 1
        assert "check before retrying" in " ".join(result.output.split())


# ---------------------------------------------------------------------------
# await: transient errors before the poll loop
# ---------------------------------------------------------------------------


class TestAwaitSurvivesReadTimeout:
    def _root(self):
        import click

        from cli.commands import await_cmd

        @click.group()
        def root():
            pass

        await_cmd.register(root)
        return root

    def _patch(self, monkeypatch, client):
        from cli.commands import await_cmd

        monkeypatch.setattr(await_cmd, "_client", lambda: client)
        monkeypatch.setattr(await_cmd, "_main", lambda: type("M", (), {
            "get_current_team": staticmethod(lambda: "team1"),
            "get_current_project": staticmethod(lambda: "proj1"),
        }))
        monkeypatch.setattr(await_cmd.time, "sleep", lambda s: None)
        monkeypatch.setattr(await_cmd, "_poll", lambda fetch, **kw: {
            "id": "e1", "created_at": "2026-11-01T00:00:00Z", "activity_type": "commented",
        })
        return await_cmd

    def test_a_timed_out_issue_lookup_and_whoami_are_retried(self, monkeypatch):
        client = MagicMock()
        client.get_issue_by_identifier.side_effect = [_timeout(), {"id": "i1", "team_id": "team1", "project_id": "proj1"}]
        client.get_me.side_effect = [httpx.ConnectError("refused"), {"id": "me"}]
        self._patch(monkeypatch, client)
        result = CliRunner().invoke(self._root(), ["await", "issue", "CHT-1", "--json", "--timeout", "1h"])
        assert result.exit_code == 0, result.output
        assert json.loads(result.stdout)["id"] == "e1"
        assert client.get_issue_by_identifier.call_count == 2
        assert "transient error" in result.stderr

    def test_still_timing_out_at_the_deadline_exits_124(self, monkeypatch):
        client = MagicMock()
        client.get_me.side_effect = _timeout()
        await_cmd = self._patch(monkeypatch, client)
        clock = iter(range(0, 10_000, 30))  # each call to time.time() is 30 s later
        monkeypatch.setattr(await_cmd.time, "time", lambda: float(next(clock)))
        result = CliRunner().invoke(self._root(), ["await", "team", "--timeout", "2m"])
        assert result.exit_code == 124, result.output
        assert "await: timeout" in result.stderr

    def test_a_refusal_is_still_exit_1(self, monkeypatch):
        client = MagicMock()
        client.get_issue_by_identifier.side_effect = APIError("not found", status_code=404)
        self._patch(monkeypatch, client)
        result = CliRunner().invoke(self._root(), ["await", "issue", "CHT-9"])
        assert result.exit_code == 1
        assert client.get_issue_by_identifier.call_count == 1
