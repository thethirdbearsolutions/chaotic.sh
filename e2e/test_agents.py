"""E2E contract tests: Agents."""
import json
import re
from contextlib import contextmanager
from unittest.mock import patch

import httpx
import pytest
from cli.client import APIError, Client
from conftest import TEST_BASE_URL


class TestTeamAgents:
    def test_create_team_agent(self, api_client, test_team):
        agent = api_client.create_team_agent(test_team["id"], "Test Agent")
        assert agent["name"] == "Test Agent"
        assert "id" in agent

    def test_get_team_agents(self, api_client, test_team):
        api_client.create_team_agent(test_team["id"], "Agent A")
        api_client.create_team_agent(test_team["id"], "Agent B")
        agents = api_client.get_team_agents(test_team["id"])
        assert isinstance(agents, list)
        assert len(agents) >= 2

    def test_get_agent(self, api_client, test_team):
        created = api_client.create_team_agent(test_team["id"], "Get Agent")
        fetched = api_client.get_agent(created["id"])
        assert fetched["id"] == created["id"]
        assert fetched["name"] == "Get Agent"

    def test_update_agent(self, api_client, test_team):
        agent = api_client.create_team_agent(test_team["id"], "Old Name")
        updated = api_client.update_agent(agent["id"], name="New Name")
        assert updated["name"] == "New Name"

    def test_delete_agent(self, api_client, test_team):
        agent = api_client.create_team_agent(test_team["id"], "To Delete")
        api_client.delete_agent(agent["id"])
        with pytest.raises(APIError):
            api_client.get_agent(agent["id"])

    def test_get_agent_not_found(self, api_client):
        with pytest.raises(APIError):
            api_client.get_agent("nonexistent-id")


class TestProjectAgents:
    def test_create_project_agent(self, api_client, test_project):
        agent = api_client.create_project_agent(test_project["id"], "Proj Agent")
        assert agent["name"] == "Proj Agent"
        assert "id" in agent



@contextmanager
def _as_agent(key):
    """A CLI Client authenticated with an agent's API key."""
    with patch("cli.client.get_api_url", return_value=TEST_BASE_URL), \
         patch("cli.client.get_token", return_value=None), \
         patch("cli.client.get_api_key", return_value=key):
        yield Client()


@pytest.fixture
def co_owner(test_team, test_user2):
    """A second owner of test_team: deleting a team's only owner is
    refused (CHT-1865), and these tests are about authorship."""
    from conftest import _run_async
    from app.enums import TeamRole
    from app.oxyde_models.team import OxydeTeamMember

    _run_async(OxydeTeamMember.objects.create(team_id=test_team["id"], user_id=test_user2.id, role=TeamRole.OWNER))
    return test_user2


class TestDeletingTheOwner:
    """DELETE /users/me follows the agent-delete rule for the account and
    every agent it owns (CHT-1467)."""

    def test_the_only_owner_of_a_team_is_refused(self, api_client, test_team):
        """CHT-1865: the team would be left with no owner."""
        with pytest.raises(APIError) as refused:
            api_client.delete_me()
        assert refused.value.status_code == 409
        assert "Transfer ownership" in str(refused.value)
        assert api_client.get_me()["id"]

    def test_an_agent_with_authored_work_blocks_its_owners_deletion(
        self, api_client, test_project, test_team, co_owner,
    ):
        agent = api_client.create_team_agent(test_team["id"], "Worker")
        with _as_agent(agent["api_key"]) as agent_client:
            issue = agent_client.create_issue(test_project["id"], "written by the agent")

        with pytest.raises(APIError) as refused:
            api_client.delete_me()

        assert refused.value.status_code == 409
        assert f"'Worker' ({agent['id'][:8]}) authored 1 issue, 1 issue activity entry" in str(refused.value)
        assert api_client.get_agent(agent["id"])["id"] == agent["id"]
        assert api_client.get_issue(issue["id"])["creator_id"] == agent["id"]

    def test_an_idle_agent_is_deleted_with_its_owner(self, api_client, test_team, co_owner):
        agent = api_client.create_team_agent(test_team["id"], "Idle")

        api_client.delete_me()

        with pytest.raises(APIError) as gone:
            api_client.get_me()
        assert gone.value.status_code == 401
        with _as_agent(agent["api_key"]) as agent_client, pytest.raises(APIError) as revoked:
            agent_client.get_me()
        assert revoked.value.status_code == 401

    def test_an_agent_cannot_delete_itself_through_users_me(self, api_client, test_team):
        agent = api_client.create_team_agent(test_team["id"], "Self")

        with _as_agent(agent["api_key"]) as agent_client, pytest.raises(APIError) as refused:
            agent_client.delete_me()

        assert refused.value.status_code == 403
        assert api_client.get_agent(agent["id"])["name"] == "Self"


class TestRegistration:
    """POST /agents/register through the CLI client (CHT-1498)."""

    def test_a_registrar_registers_a_session_that_writes_as_itself(self, api_client, test_team, test_project):
        registrar = api_client.create_team_agent(test_team["id"], "Harness")
        api_client.update_agent(registrar["id"], can_register=True)
        ref = "claude-code:session:e2e-0001"

        with _as_agent(registrar["api_key"]) as harness:
            first = harness.register_agent(ref, name="Claude · e2e")
            again = harness.register_agent(ref)
            with pytest.raises(APIError) as refused:
                harness.create_issue(project_id=test_project["id"], title="as the harness")
        assert refused.value.status_code == 403

        assert first["created"] is True and again["created"] is False
        assert again["agent"]["id"] == first["agent"]["id"] and again["agent"]["name"] == "Claude · e2e"
        assert again["agent"]["kind"] == "session" and again["agent"]["registered_by_id"] == registrar["id"]

        with _as_agent(again["api_key"]) as session:
            issue = session.create_issue(project_id=test_project["id"], title="by the session")
        assert issue["creator"]["kind"] == "session"
        assert issue["creator"]["registered_by_name"] == "Harness"


class TestRegistrarCreation:
    """`agent create --registrar` / `agent update --registrar` through the
    CLI client (CHT-1600)."""

    def test_create_a_registrar_and_turn_it_off(self, api_client, test_team, test_project):
        registrar = api_client.create_team_agent(test_team["id"], "Harness", can_register=True)
        assert registrar["can_register"] is True
        with _as_agent(registrar["api_key"]) as harness, pytest.raises(APIError) as refused:
            harness.create_issue(project_id=test_project["id"], title="as the harness")
        assert refused.value.status_code == 403
        assert refused.value.detail["error_code"] == "registrar_cannot_write"

        off = api_client.update_agent(registrar["id"], can_register=False)
        assert off["can_register"] is False
        with _as_agent(registrar["api_key"]) as harness:
            assert harness.create_issue(project_id=test_project["id"], title="writes again")["id"]

    def test_project_scoped_registrar(self, api_client, test_project):
        registrar = api_client.create_project_agent(test_project["id"], "CI", can_register=True)
        assert registrar["can_register"] is True and registrar["agent_project_id"] == test_project["id"]


class TestAutomaticSessionIdentity:
    """`session_identity: auto` against the real server (CHT-1499): the
    registrar's key only registers; every request goes as the session."""

    SESSION_ID = "e2e-session-0001"

    @staticmethod
    def _profile(monkeypatch, tmp_path, key, session_id):
        """A profile with session_identity auto and this registrar key,
        as a cloud environment sets it: through the environment (the
        registrar key and server never come from a repository's .chaotic)."""
        from cli import config as cli_config

        monkeypatch.setattr(cli_config, "GLOBAL_CONFIG_DIR", tmp_path)
        monkeypatch.setattr(cli_config, "load_local_config", lambda: {})
        monkeypatch.setattr(cli_config, "get_current_team", lambda: None)
        monkeypatch.setenv("CHAOTIC_SESSION_IDENTITY", "auto")
        monkeypatch.setenv("CLAUDE_CODE_SESSION_ID", session_id)
        monkeypatch.setenv("CHAOTIC_API_KEY", key)
        monkeypatch.setenv("CHAOTIC_API_URL", TEST_BASE_URL)
        monkeypatch.delenv("CHAOTIC_TOKEN", raising=False)

    def _cache(self, key):
        from cli import session_identity

        ref = "claude-code:session:" + self.SESSION_ID
        path = session_identity.cache_path(ref, TEST_BASE_URL, session_identity.fingerprint(key), None)
        return json.loads(path.read_text())

    def test_writes_as_the_session_and_renews_a_revoked_key(self, api_client, test_team, test_project, tmp_path, monkeypatch):
        from cli import session_identity

        registrar = api_client.create_team_agent(test_team["id"], "Claude Code", can_register=True)
        self._profile(monkeypatch, tmp_path, registrar["api_key"], self.SESSION_ID)
        ref = "claude-code:session:" + self.SESSION_ID
        session = Client()
        issue = session.create_issue(project_id=test_project["id"], title="by the session")
        me = session.get_me()
        first = self._cache(registrar["api_key"])

        assert issue["creator"]["kind"] == "session"
        assert issue["creator"]["registered_by_name"] == "Claude Code"
        assert me["external_ref"] == ref and me["registered_by_name"] == "Claude Code"
        assert me["name"].startswith("Claude Code · ")
        # A random tail, not the session id's first 6 characters (CHT-1869).
        tail = me["name"].rsplit(" · ", 1)[1]
        assert re.fullmatch(r"[0-9a-f]{6}", tail) and tail not in ref
        assert first["agent_id"] == me["id"]

        # Revoked (or expired): the next request registers again, once,
        # and the identity is the same one. (The person's own client would
        # itself act through a session identity here.)
        with session_identity.suspended():
            api_client.revoke_api_key(first["api_key_id"])
        again = session.get_me()
        second = self._cache(registrar["api_key"])
        assert again["id"] == me["id"]
        assert second["api_key"] != first["api_key"]
        # The CLI drew a new tail for its default_name, but a default
        # names a new identity only: the name and its handle stay put.
        assert again["name"] == me["name"]

    def test_a_non_registrar_key_fails_loudly(self, api_client, test_team, test_project, tmp_path, monkeypatch):
        from cli import session_identity

        plain = api_client.create_team_agent(test_team["id"], "bot")
        self._profile(monkeypatch, tmp_path, plain["api_key"], self.SESSION_ID)
        with pytest.raises(APIError) as refused:
            Client().create_issue(project_id=test_project["id"], title="never sent")
        assert "is not a registrar" in str(refused.value)
        assert "creator or a team admin" in str(refused.value)
        assert "Not falling back" in str(refused.value)
        with session_identity.suspended():
            assert api_client.get_issues(project_id=test_project["id"]) == []


class TestRegistrarKeyViaProxyHeader:
    """CHT-1906 end to end: no key configured locally; a proxy injects
    the registrar's key as X-Chaotic-Registrar-Key on every request to
    the server, as a cloud environment's network secret does."""

    SESSION_ID = "e2e-session-proxied"

    def test_registers_through_the_proxy_header_and_writes_as_the_session(
        self, api_client, test_team, test_project, tmp_path, monkeypatch,
    ):
        from cli import config as cli_config
        from cli import session_identity

        registrar = api_client.create_team_agent(test_team["id"], "Cloud registrar", can_register=True)
        secret = registrar["api_key"]
        seen = []

        class InjectingProxy(httpx.HTTPTransport):
            def handle_request(self, request):
                seen.append(request.headers.get("Authorization", ""))
                request.headers["X-Chaotic-Registrar-Key"] = secret
                return super().handle_request(request)

        real = httpx.Client
        monkeypatch.setattr(httpx, "Client", lambda *a, **kw: real(*a, transport=InjectingProxy(), **kw))
        monkeypatch.setattr(cli_config, "GLOBAL_CONFIG_DIR", tmp_path)
        monkeypatch.setattr(cli_config, "load_local_config", lambda: {})
        monkeypatch.setattr(cli_config, "get_current_team", lambda: None)
        monkeypatch.setenv("CHAOTIC_SESSION_IDENTITY", "auto")
        monkeypatch.setenv("CHAOTIC_REGISTRAR_KEY_VIA", "header")
        monkeypatch.setenv("CLAUDE_CODE_SESSION_ID", self.SESSION_ID)
        monkeypatch.setenv("CHAOTIC_API_URL", TEST_BASE_URL)
        for env in ("CHAOTIC_API_KEY", "CHAOTIC_TOKEN"):
            monkeypatch.delenv(env, raising=False)
        monkeypatch.setattr("cli.client.get_api_key", lambda: None)
        monkeypatch.setattr("cli.client.get_token", lambda: None)

        session = Client()
        me = session.get_me()
        issue = session.create_issue(project_id=test_project["id"], title="through the proxy")

        assert me["kind"] == "session" and me["external_ref"] == "claude-code:session:" + self.SESSION_ID
        assert me["registered_by_id"] == registrar["id"]
        assert me["name"].startswith("Cloud registrar · ")
        assert issue["creator"]["id"] == me["id"]
        assert secret not in seen  # the CLI never sent the registrar key itself
        assert seen[0] == ""  # register went with no Authorization
        assert session_identity.registrar_key_via() == "header"
