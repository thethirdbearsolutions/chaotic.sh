"""POST /agents/register: agent self-registration (CHT-1498, slice S2).

A registrar (an agent with can_register, made once by a human) gets or
creates the session identity it knows by external_ref and mints it a
fresh 7-day key. Each rule of the ticket has a class here.
"""
import asyncio
from datetime import datetime, timedelta, timezone

import pytest
from fastapi.routing import APIRoute

from app.api.deps import get_current_user
from app.config import get_settings
from app.enums import AgentKind, TeamRole
from app.oxyde_models.api_key import OxydeAPIKey
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
from app.oxyde_models.user import OxydeUser
from app.utils.security import create_access_token, get_password_hash

REF = "claude-code:session:2b1f0000-aaaa-bbbb-cccc-000000000001"


def _bearer(key):
    return {"Authorization": f"Bearer {key}"}


async def _make_user(email, name):
    user = await OxydeUser.objects.create(email=email, hashed_password=get_password_hash("pw-12345678"), name=name)
    return user, _bearer(create_access_token(data={"sub": user.id}))


async def _registrar(client, headers, team_id=None, project_id=None, name="Claude Code (cloud)"):
    url = f"/api/projects/{project_id}/agents" if project_id else f"/api/teams/{team_id}/agents"
    created = await client.post(url, json={"name": name, "can_register": True}, headers=headers)
    assert created.status_code == 201, created.text
    return created.json()["id"], created.json()["api_key"]


async def _register(client, key, ref=REF, **body):
    return await client.post("/api/agents/register", json={"external_ref": ref, **body}, headers=_bearer(key))


def _code(response):
    return response.json()["detail"]["error_code"]


@pytest.fixture
async def registrar(client, auth_headers, test_team):
    """A team-scoped registrar created by test_user (the team's owner)."""
    return await _registrar(client, auth_headers, team_id=test_team.id)


@pytest.fixture
def limits(monkeypatch):
    settings = get_settings()

    def set_(**values):
        for name, value in values.items():
            monkeypatch.setattr(settings, name, value)
    return set_


class TestRegister:
    async def test_creates_a_session_identity_with_an_expiring_key(self, client, registrar, test_user, test_team):
        registrar_id, key = registrar
        before = datetime.now(timezone.utc)

        response = await _register(client, key, name="Claude · cht-1498")

        assert response.status_code == 201, response.text
        body = response.json()
        agent = body["agent"]
        assert body["created"] is True
        assert agent["kind"] == "session" and agent["external_ref"] == REF
        assert agent["registered_by_id"] == registrar_id and agent["can_register"] is False
        assert agent["name"] == "Claude · cht-1498"
        assert agent["agent_team_id"] == test_team.id and agent["agent_project_id"] is None
        # Owned and held by the human behind the registrar's key.
        assert agent["parent_user_id"] == test_user.id
        row = await OxydeAPIKey.objects.get(id=body["api_key_id"])
        assert row.principal_user_id == agent["id"] and row.holder_user_id == test_user.id
        assert row.name == f"session {REF}"
        expires = datetime.fromisoformat(body["expires_at"])
        assert timedelta(days=7) - timedelta(minutes=1) < expires - before < timedelta(days=7, minutes=1)

        me = await client.get("/api/auth/me", headers=_bearer(body["api_key"]))
        assert me.status_code == 200
        assert (me.json()["id"], me.json()["kind"], me.json()["registered_by_id"]) == (agent["id"], "session", registrar_id)

    async def test_the_identity_writes_as_itself(self, client, registrar, test_project):
        _, key = registrar
        session_key = (await _register(client, key)).json()["api_key"]

        issue = await client.post(
            f"/api/projects/{test_project.id}/issues", json={"title": "by a session"}, headers=_bearer(session_key),
        )
        assert issue.status_code == 201, issue.text
        creator = issue.json()["creator"]
        assert creator["kind"] == "session"
        assert creator["registered_by_name"] == "Claude Code (cloud)"
        assert creator["owner_name"] == "Test User"

    async def test_default_name_names_the_registrar(self, client, registrar):
        _, key = registrar
        agent = (await _register(client, key)).json()["agent"]
        assert agent["name"] == f"Claude Code (cloud) · {REF[-8:]}"

    async def test_rejects_a_ref_with_whitespace(self, client, registrar):
        _, key = registrar
        assert (await _register(client, key, ref="has space")).status_code == 422


class TestIdempotency:
    async def test_same_registrar_gets_the_same_identity_and_a_rotated_key(self, client, registrar):
        _, key = registrar
        first = (await _register(client, key, name="one")).json()

        again = await _register(client, key, name="two")

        assert again.status_code == 200, again.text
        second = again.json()
        assert second["created"] is False
        assert second["agent"]["id"] == first["agent"]["id"] and second["agent"]["name"] == "two"
        assert second["api_key"] != first["api_key"]
        # One live key per identity: the old one is revoked.
        assert (await client.get("/api/auth/me", headers=_bearer(first["api_key"]))).status_code == 401
        assert (await client.get("/api/auth/me", headers=_bearer(second["api_key"]))).status_code == 200
        assert await OxydeAPIKey.objects.filter(principal_user_id=first["agent"]["id"], is_active=True).count() == 1

    async def test_omitting_the_name_keeps_it(self, client, registrar):
        _, key = registrar
        await _register(client, key, name="kept")
        assert (await _register(client, key)).json()["agent"]["name"] == "kept"

    async def test_another_registrar_gets_409(self, client, auth_headers, registrar, test_team):
        _, key = registrar
        _, other_key = await _registrar(client, auth_headers, team_id=test_team.id, name="Laptop")
        await _register(client, key)

        response = await _register(client, other_key)

        assert response.status_code == 409 and _code(response) == "external_ref_taken"

    async def test_the_same_ref_in_another_team_is_a_different_identity(self, client, registrar, test_user):
        _, key = registrar
        other_team = await OxydeTeam.objects.create(name="Other", key="OTH")
        await OxydeTeamMember.objects.create(team_id=other_team.id, user_id=test_user.id, role=TeamRole.OWNER)
        headers = _bearer(create_access_token(data={"sub": test_user.id}))
        _, other_key = await _registrar(client, headers, team_id=other_team.id)

        a = (await _register(client, key)).json()["agent"]
        b = (await _register(client, other_key)).json()["agent"]

        assert a["id"] != b["id"] and b["agent_team_id"] == other_team.id

    async def test_a_hand_made_agent_with_the_ref_is_never_adopted(self, client, registrar, test_team, test_user):
        _, key = registrar
        await OxydeUser.objects.create(
            email="hand@agent.local", hashed_password="", name="Hand", is_agent=True,
            kind=AgentKind.ASSISTANT, parent_user_id=test_user.id, agent_team_id=test_team.id, external_ref=REF,
        )
        response = await _register(client, key)
        assert response.status_code == 409 and _code(response) == "external_ref_taken"

    async def test_a_deactivated_identity_gets_409(self, client, auth_headers, registrar):
        _, key = registrar
        agent_id = (await _register(client, key)).json()["agent"]["id"]
        assert (await client.post(f"/api/agents/{agent_id}/deactivate", headers=auth_headers)).status_code == 200

        response = await _register(client, key)

        assert response.status_code == 409 and _code(response) == "identity_deactivated"
        assert response.json()["detail"]["agent_id"] == agent_id

    async def test_scope_does_not_change_on_re_registration(self, client, registrar, test_project):
        _, key = registrar
        await _register(client, key)
        response = await _register(client, key, project_id=test_project.id)
        assert response.status_code == 409 and _code(response) == "identity_scope_mismatch"

    async def test_concurrent_registrations_of_one_ref_make_one_identity(self, client, registrar):
        _, key = registrar
        responses = await asyncio.gather(*[_register(client, key) for _ in range(3)])
        assert all(r.status_code in (200, 201) for r in responses), [r.text for r in responses]
        assert len({r.json()["agent"]["id"] for r in responses}) == 1
        assert await OxydeUser.objects.filter(external_ref=REF).count() == 1


    async def test_losing_the_create_race_returns_the_winners_identity(self, client, registrar, monkeypatch):
        """The unique index is the backstop: a request that looked before
        the winner committed hits IntegrityError on insert, and retries
        into the get path."""
        from app.services.registration_service import RegistrationService

        _, key = registrar
        winner = (await _register(client, key)).json()["agent"]["id"]
        real_find, calls = RegistrationService._find, []

        async def stale_once(self, team_id, ref):
            calls.append(ref)
            return None if len(calls) == 1 else await real_find(self, team_id, ref)

        monkeypatch.setattr(RegistrationService, "_find", stale_once)
        response = await _register(client, key)

        assert response.status_code == 200, response.text
        assert response.json()["agent"]["id"] == winner and len(calls) == 2


class TestCaller:
    async def test_a_registrar_must_call_with_one_of_its_keys(self, client, registrar):
        registrar_id, _ = registrar
        jwt = _bearer(create_access_token(data={"sub": registrar_id}))
        response = await client.post("/api/agents/register", json={"external_ref": REF}, headers=jwt)
        assert response.status_code == 403 and _code(response) == "registrar_key_required"

    async def test_a_registrar_whose_holder_is_deactivated_is_refused(self, client, registrar, test_user):
        _, key = registrar
        await OxydeUser.objects.filter(id=test_user.id).update(is_active=False)
        response = await _register(client, key)
        assert response.status_code == 403 and _code(response) == "registrar_holder_not_member"

    async def test_a_person_naming_a_project_outside_the_team_is_refused(self, client, auth_headers, test_project):
        response = await client.post(
            "/api/agents/register",
            json={"external_ref": REF, "project_id": test_project.id, "team_id": "another"},
            headers=auth_headers,
        )
        assert response.status_code == 422 and _code(response) == "tool_input"

    async def test_an_agent_without_can_register_is_refused(self, client, auth_headers, test_team):
        created = await client.post(f"/api/teams/{test_team.id}/agents", json={"name": "Plain"}, headers=auth_headers)
        response = await _register(client, created.json()["api_key"])
        assert response.status_code == 403 and _code(response) == "not_a_registrar"

    async def test_a_registered_identity_cannot_register(self, client, registrar):
        _, key = registrar
        session_key = (await _register(client, key)).json()["api_key"]
        response = await _register(client, session_key, ref="claude-code:session:nested")
        assert response.status_code == 403 and _code(response) == "registered_identity_cannot_register"

    async def test_a_person_may_register_for_themself(self, client, auth_headers, test_user, test_team):
        response = await client.post(
            "/api/agents/register", json={"external_ref": REF, "team_id": test_team.id, "name": "Local"},
            headers=auth_headers,
        )
        assert response.status_code == 201, response.text
        agent = response.json()["agent"]
        assert agent["registered_by_id"] == test_user.id and agent["parent_user_id"] == test_user.id
        key = await OxydeAPIKey.objects.get(id=response.json()["api_key_id"])
        assert key.holder_user_id == test_user.id

    async def test_a_person_must_name_a_team_they_belong_to(self, client, auth_headers, auth_headers2, test_team):
        missing = await client.post("/api/agents/register", json={"external_ref": REF}, headers=auth_headers)
        assert missing.status_code == 422
        outsider = await client.post(
            "/api/agents/register", json={"external_ref": REF, "team_id": test_team.id}, headers=auth_headers2,
        )
        assert outsider.status_code == 403 and _code(outsider) == "not_a_member"

    async def test_a_person_may_name_just_the_project(self, client, auth_headers, test_project):
        response = await client.post(
            "/api/agents/register", json={"external_ref": REF, "project_id": test_project.id}, headers=auth_headers,
        )
        assert response.status_code == 201
        assert response.json()["agent"]["agent_project_id"] == test_project.id


class TestScope:
    async def test_a_team_registrar_may_narrow_to_a_project_of_its_team(self, client, registrar, test_project):
        _, key = registrar
        response = await _register(client, key, project_id=test_project.id)
        assert response.status_code == 201
        assert response.json()["agent"]["agent_project_id"] == test_project.id

    async def test_a_project_in_another_team_is_refused(self, client, registrar):
        _, key = registrar
        other_team = await OxydeTeam.objects.create(name="Other", key="OTH")
        project = await OxydeProject.objects.create(team_id=other_team.id, name="P", key="OP")
        response = await _register(client, key, project_id=project.id)
        assert response.status_code == 403 and _code(response) == "scope_exceeds_registrar"
        assert other_team.id in response.json()["detail"]["message"] or "another team" in response.json()["detail"]["message"]

    async def test_another_team_id_is_refused(self, client, registrar):
        _, key = registrar
        response = await _register(client, key, team_id="some-other-team")
        assert response.status_code == 403 and _code(response) == "scope_exceeds_registrar"

    async def test_a_project_registrar_identities_inherit_its_project(self, client, auth_headers, test_project, test_team):
        _, key = await _registrar(client, auth_headers, project_id=test_project.id)
        inherited = await _register(client, key)
        assert inherited.json()["agent"]["agent_project_id"] == test_project.id

        sibling = await OxydeProject.objects.create(team_id=test_team.id, name="Sibling", key="SIB")
        widened = await _register(client, key, ref="claude-code:session:other", project_id=sibling.id)
        assert widened.status_code == 403 and _code(widened) == "scope_exceeds_registrar"
        assert test_project.id in widened.json()["detail"]["message"]

    async def test_an_unknown_project_is_404(self, client, registrar):
        _, key = registrar
        assert (await _register(client, key, project_id="nope")).status_code == 404


class TestCaps:
    async def test_active_identity_cap(self, client, auth_headers, registrar, limits):
        _, key = registrar
        limits(registrar_max_active_identities=2)
        a = (await _register(client, key, ref="r:a")).json()["agent"]["id"]
        await _register(client, key, ref="r:b")

        over = await _register(client, key, ref="r:c")
        assert over.status_code == 429 and _code(over) == "registrar_identity_cap"
        assert over.json()["detail"]["limit"] == 2

        # Re-registering an existing identity is not a new one.
        assert (await _register(client, key, ref="r:a")).status_code == 200
        # Deactivating one frees a slot.
        await client.post(f"/api/agents/{a}/deactivate", headers=auth_headers)
        assert (await _register(client, key, ref="r:c")).status_code == 201

    async def test_hourly_rate_counts_rotations(self, client, registrar, limits):
        _, key = registrar
        limits(registrar_max_registrations_per_hour=3)
        for _ in range(3):
            assert (await _register(client, key)).status_code in (200, 201)

        over = await _register(client, key, ref="r:new")

        assert over.status_code == 429 and _code(over) == "registrar_rate_limited"
        retry = int(over.headers["Retry-After"])
        assert 3500 <= retry <= 3601 and over.json()["detail"]["retry_after_seconds"] == retry

    async def test_registrations_older_than_an_hour_do_not_count(self, client, registrar, limits):
        _, key = registrar
        limits(registrar_max_registrations_per_hour=2)
        await _register(client, key)
        await _register(client, key)
        await OxydeAPIKey.objects.filter(name=f"session {REF}").update(
            created_at=datetime.now(timezone.utc) - timedelta(minutes=61),
        )
        assert (await _register(client, key)).status_code == 200

    async def test_caps_are_per_registrar(self, client, auth_headers, registrar, test_team, limits):
        _, key = registrar
        _, other_key = await _registrar(client, auth_headers, team_id=test_team.id, name="Laptop")
        limits(registrar_max_active_identities=1)
        assert (await _register(client, key, ref="r:a")).status_code == 201
        assert (await _register(client, other_key, ref="r:b")).status_code == 201


class TestExpiry:
    async def test_an_expired_session_key_is_refused_and_re_registering_renews(self, client, registrar):
        _, key = registrar
        first = (await _register(client, key)).json()
        await OxydeAPIKey.objects.filter(id=first["api_key_id"]).update(
            expires_at=datetime.now(timezone.utc) - timedelta(seconds=1),
        )
        assert (await client.get("/api/auth/me", headers=_bearer(first["api_key"]))).status_code == 401

        renewed = (await _register(client, key)).json()
        assert renewed["agent"]["id"] == first["agent"]["id"]
        assert (await client.get("/api/auth/me", headers=_bearer(renewed["api_key"]))).status_code == 200

    async def test_ttl_comes_from_settings(self, client, registrar, limits):
        _, key = registrar
        limits(agent_session_key_ttl_seconds=3600)
        body = (await _register(client, key)).json()
        left = datetime.fromisoformat(body["expires_at"]) - datetime.now(timezone.utc)
        assert timedelta(minutes=59) < left <= timedelta(hours=1)


class TestRegisterOnly:
    """A registrar's key may register and read, nothing else, on REST and
    on /mcp (spec I8: fail closed)."""

    async def test_rest_reads_are_allowed(self, client, registrar, test_team):
        _, key = registrar
        assert (await client.get("/api/auth/me", headers=_bearer(key))).status_code == 200
        assert (await client.get(f"/api/teams/{test_team.id}/agents", headers=_bearer(key))).status_code == 200

    @pytest.mark.parametrize("method,path,body", [
        ("post", "/api/projects/{project}/issues", {"title": "as the harness"}),
        ("post", "/api/api-keys", {"name": "escape hatch"}),
        ("patch", "/api/users/me", {"name": "renamed"}),
        ("post", "/api/teams/{team}/agents", {"name": "child"}),
        ("delete", "/api/api-keys/{key_id}", None),
    ])
    async def test_rest_writes_are_refused(self, client, registrar, test_project, test_team, method, path, body):
        registrar_id, key = registrar
        key_id = (await OxydeAPIKey.objects.filter(principal_user_id=registrar_id).first()).id
        url = path.format(project=test_project.id, team=test_team.id, key_id=key_id)
        kwargs = {"headers": _bearer(key)}
        if body is not None:
            kwargs["json"] = body
        response = await getattr(client, method)(url, **kwargs)
        assert response.status_code == 403, response.text
        assert _code(response) == "registrar_cannot_write"

    async def test_turning_the_capability_off_restores_writes(self, client, auth_headers, registrar, test_project):
        registrar_id, key = registrar
        off = await client.patch(f"/api/agents/{registrar_id}", json={"can_register": False}, headers=auth_headers)
        assert off.status_code == 200 and off.json()["kind"] == "assistant"
        issue = await client.post(
            f"/api/projects/{test_project.id}/issues", json={"title": "t"}, headers=_bearer(key),
        )
        assert issue.status_code == 201

    async def test_mcp_writes_are_refused_and_reads_allowed(self, client, registrar, test_project):
        from app.mcp_server import context, tools

        registrar_id, _ = registrar
        user = await OxydeUser.objects.get(id=registrar_id)
        token = context.current_mcp_user.set(user)
        try:
            refused = await tools.issue_create(title="as the harness", project=test_project.id)
            assert refused["error"]["error_code"] == "registrar_cannot_write", refused
            assert refused["error"]["http_status"] == 403
            listed = await tools.issue_list(project=test_project.id)
            assert "error" not in listed, listed
        finally:
            context.current_mcp_user.reset(token)

    def test_every_mcp_backend_method_is_classified(self):
        """A backend method that is not a read must refuse registrars. The
        wrapper decides by name; this pins that every public coroutine is
        either a resolver (reads only) or wrapped, and lists the reads so
        a new write can't hide behind a get_/list_ name unnoticed."""
        import inspect

        from app.mcp_server.backend import InProcessBackend, is_read_method

        resolvers = {
            "resolve_team", "resolve_project", "optional_project", "team_for_project",
            "resolve_assignee", "resolve_sprint", "resolve_document", "me_id",
        }
        writes, reads = set(), set()
        for name, fn in inspect.getmembers(InProcessBackend, inspect.iscoroutinefunction):
            if name.startswith("_") or name in resolvers:
                continue
            assert hasattr(fn, "__wrapped__"), f"{name} is not behind _translated, so no registrar check"
            (reads if is_read_method(name) else writes).add(name)
        assert {"create_issue", "update_issue", "create_comment", "close_sprint", "mark_inbox_read"} <= writes
        assert all(n.startswith(("get_", "list_")) or n == "server_info" for n in reads)

    def test_every_rest_write_route_authenticates_through_get_current_user(self):
        """The REST rule lives in get_current_user, so a write route that
        authenticates some other way would escape it."""
        from app.main import app

        def depends_on_current_user(dependant):
            return any(
                d.call is get_current_user or depends_on_current_user(d) for d in dependant.dependencies
            )

        unauthenticated = {"/api/auth/signup", "/api/auth/login", "/api/teams/invitations/{token}/accept"}
        escaped = [
            (sorted(r.methods), r.path) for r in app.routes
            if isinstance(r, APIRoute) and r.methods - {"GET", "HEAD", "OPTIONS"}
            and not depends_on_current_user(r.dependant) and r.path not in unauthenticated
        ]
        assert escaped == []


class TestCascade:
    async def test_deactivating_a_registrar_retires_its_identities(self, client, auth_headers, registrar, test_team):
        registrar_id, key = registrar
        keys = [(await _register(client, key, ref=f"r:{i}")).json() for i in range(3)]
        _, other_key = await _registrar(client, auth_headers, team_id=test_team.id, name="Laptop")
        bystander = (await _register(client, other_key, ref="r:other")).json()

        response = await client.post(f"/api/agents/{registrar_id}/deactivate", headers=auth_headers)

        assert response.status_code == 200 and response.json()["deactivated_identities"] == 3
        for k in keys:
            assert (await client.get("/api/auth/me", headers=_bearer(k["api_key"]))).status_code == 401
            assert (await OxydeUser.objects.get(id=k["agent"]["id"])).is_active is False
        assert (await client.get("/api/auth/me", headers=_bearer(bystander["api_key"]))).status_code == 200

        # Reactivating the registrar does not bring them back.
        back = await client.post(f"/api/agents/{registrar_id}/reactivate", headers=auth_headers)
        assert back.status_code == 200 and back.json()["deactivated_identities"] is None
        assert (await OxydeUser.objects.get(id=keys[0]["agent"]["id"])).is_active is False

    async def test_identities_die_with_the_human_who_holds_the_registrar(
        self, client, auth_headers, test_user2, auth_headers2, test_team, test_project,
    ):
        """The registrar's creator leaves the team: the registrar key and
        every session key minted with it stop working (CHT-1510's rule,
        now for registered identities), and nothing can be re-registered."""
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        registrar_id, key = await _registrar(client, auth_headers2, team_id=test_team.id)
        session = (await _register(client, key)).json()
        assert session["agent"]["parent_user_id"] == test_user2.id

        removed = await client.delete(f"/api/teams/{test_team.id}/members/{test_user2.id}", headers=auth_headers)
        assert removed.status_code == 204, removed.text

        assert (await client.get("/api/auth/me", headers=_bearer(session["api_key"]))).status_code == 401
        assert (await client.get("/api/auth/me", headers=_bearer(key))).status_code == 401
        assert (await _register(client, key)).status_code == 401
        assert await OxydeAPIKey.objects.filter(holder_user_id=test_user2.id, is_active=True).count() == 0

    async def test_holder_gone_without_revocation_still_blocks_registration(
        self, client, auth_headers, test_user2, auth_headers2, test_team,
    ):
        """Even if the removal's sweep missed a key, sign-in refuses it and
        registration re-checks the holder inside its transaction."""
        membership = await OxydeTeamMember.objects.create(
            team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER,
        )
        _, key = await _registrar(client, auth_headers2, team_id=test_team.id)
        await OxydeTeamMember.objects.filter(id=membership.id).delete()
        assert (await _register(client, key)).status_code == 401


class TestNames:
    @pytest.mark.parametrize("name", ["Test User", "  test   USER "])
    async def test_a_human_members_name_is_refused(self, client, registrar, name):
        _, key = registrar
        response = await _register(client, key, name=name)
        assert response.status_code == 422 and _code(response) == "name_matches_member"

    async def test_renaming_to_a_members_name_is_refused(self, client, registrar):
        _, key = registrar
        await _register(client, key, name="fine")
        response = await _register(client, key, name="Test User")
        assert response.status_code == 422 and _code(response) == "name_matches_member"

    async def test_a_non_members_name_is_fine(self, client, registrar, test_user2):
        _, key = registrar
        assert (await _register(client, key, name=test_user2.name)).status_code == 201


class TestRegistrarToggle:
    async def test_creator_or_admin_toggles_and_kind_follows(self, client, auth_headers, test_team):
        created = await client.post(f"/api/teams/{test_team.id}/agents", json={"name": "Harness"}, headers=auth_headers)
        agent_id = created.json()["id"]

        on = await client.patch(f"/api/agents/{agent_id}", json={"can_register": True}, headers=auth_headers)
        assert on.status_code == 200 and (on.json()["can_register"], on.json()["kind"]) == (True, "service")
        assert (await _register(client, created.json()["api_key"])).status_code == 201

        renamed = await client.patch(f"/api/agents/{agent_id}", json={"name": "Harness 2"}, headers=auth_headers)
        assert (renamed.json()["can_register"], renamed.json()["kind"]) == (True, "service")

    async def test_a_plain_member_who_did_not_create_it_cannot(
        self, client, registrar, test_user2, auth_headers2, test_team,
    ):
        registrar_id, _ = registrar
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        response = await client.patch(f"/api/agents/{registrar_id}", json={"can_register": False}, headers=auth_headers2)
        assert response.status_code == 403

    async def test_a_registered_identity_cannot_become_a_registrar(self, client, auth_headers, registrar):
        _, key = registrar
        agent_id = (await _register(client, key)).json()["agent"]["id"]
        response = await client.patch(f"/api/agents/{agent_id}", json={"can_register": True}, headers=auth_headers)
        assert response.status_code == 409 and _code(response) == "registered_identity_cannot_register"

    async def test_an_agent_cannot_toggle_itself(self, client, registrar):
        registrar_id, key = registrar
        response = await client.patch(f"/api/agents/{registrar_id}", json={"can_register": False}, headers=_bearer(key))
        assert response.status_code == 403
