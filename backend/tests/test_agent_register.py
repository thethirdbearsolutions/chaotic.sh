"""POST /agents/register: agent self-registration (CHT-1498, slice S2).

A registrar (an agent with can_register, made once by a human) gets or
creates the session identity it knows by external_ref and mints it a
fresh 7-day key. Each rule of the ticket has a class here.
"""
import asyncio
from datetime import datetime, timedelta, timezone

import pytest
from fastapi.routing import APIRoute, iter_route_contexts

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


def _api_routes():
    """(methods, full path, endpoint, dependant) for every APIRoute the app
    serves. FastAPI 0.143 keeps an included router as one entry in
    ``app.routes``, so iterating that list alone finds none of /api
    (CHT-1561)."""
    from app.main import app

    routes = [
        (rc.methods, rc.path, rc.endpoint, rc.original_route.dependant)
        for rc in iter_route_contexts(app.routes)
        if isinstance(rc.original_route, APIRoute)
    ]
    assert len(routes) > 100, len(routes)
    return routes


def _depends_on_current_user(dependant):
    return any(d.call is get_current_user or _depends_on_current_user(d) for d in dependant.dependencies)


async def _make_user(email, name):
    user = await OxydeUser.objects.create(email=email, hashed_password=get_password_hash("pw-12345678"), name=name)
    return user, _bearer(create_access_token(data={"sub": user.id}))


async def _registrar(client, headers, team_id=None, project_id=None, name="Claude Code (cloud)"):
    url = f"/api/projects/{project_id}/agents" if project_id else f"/api/teams/{team_id}/agents"
    created = await client.post(url, json={"name": name, "can_register": True}, headers=headers)
    assert created.status_code == 201, created.text
    # Echoed so `agent create --registrar` can confirm it (CHT-1600).
    assert (created.json()["can_register"], created.json()["kind"]) == (True, "service")
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
        # `chaotic auth whoami` names the registrar (CHT-1499).
        assert me.json()["registered_by_name"] == "Claude Code (cloud)"
        assert (await client.get("/api/auth/me", headers=_bearer(key))).json()["registered_by_name"] is None

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

    async def test_re_registering_reports_the_rotated_out_key(self, client, registrar):
        """CHT-1625: the old key's dependents (push devices, sockets) end
        with it, after the commit."""
        from app.services import credential_events

        _, key = registrar
        first = (await _register(client, key)).json()
        old = await OxydeAPIKey.objects.get(principal_user_id=first["agent"]["id"], is_active=True)
        seen = []

        async def hook(event):
            seen.append(event)

        remove = credential_events.register(hook)
        try:
            assert (await _register(client, key)).status_code == 200
        finally:
            remove()
        assert [e.key_ids for e in seen] == [frozenset({old.id})]

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
        """Since CHT-1552 the key no longer signs in at all (the revoked-key
        401); register's own in-transaction re-check stays for a holder
        deactivated mid-request."""
        _, key = registrar
        await OxydeUser.objects.filter(id=test_user.id).update(is_active=False)
        response = await _register(client, key)
        assert response.status_code == 401 and response.json()["detail"] == "Invalid API key"

    async def test_a_registered_identitys_key_dies_with_its_holder(self, client, registrar, test_user):
        """The identity's key is held by the registrar key's holder, so
        deactivating that human ends the identity's key too (CHT-1552)."""
        _, key = registrar
        session_key = (await _register(client, key)).json()["api_key"]
        assert (await client.get("/api/auth/me", headers=_bearer(session_key))).status_code == 200

        await OxydeUser.objects.filter(id=test_user.id).update(is_active=False)

        response = await client.get("/api/auth/me", headers=_bearer(session_key))
        assert response.status_code == 401 and response.json()["detail"] == "Invalid API key"

    async def test_a_holder_deactivated_after_sign_in_is_refused_by_register(self, registrar, test_user):
        """The in-transaction re-check: a holder deactivated between sign-in
        and the register transaction is still refused (CHT-1498, CHT-1552)."""
        from app.schemas.agent import AgentRegister
        from app.services.api_key_service import APIKeyService
        from app.services.registration_service import RegistrationRefused, RegistrationService

        agent_id, key = registrar
        calling_key = await APIKeyService().validate_key(key)
        caller = await OxydeUser.objects.get(id=agent_id)
        await OxydeUser.objects.filter(id=test_user.id).update(is_active=False)
        with pytest.raises(RegistrationRefused) as refused:
            await RegistrationService().register(caller, calling_key, AgentRegister(external_ref=REF))
        assert (refused.value.status_code, refused.value.error_code) == (403, "registrar_holder_not_member")

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

    async def test_a_registered_identity_cannot_mint_its_own_keys(self, client, registrar):
        """Otherwise it could swap its 7-day key for one that never expires."""
        _, key = registrar
        session_key = (await _register(client, key)).json()["api_key"]
        response = await client.post("/api/api-keys", json={"name": "forever"}, headers=_bearer(session_key))
        assert response.status_code == 403 and _code(response) == "registered_identity_key"

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

    async def test_a_project_in_another_team_answers_like_a_missing_one(self, client, registrar):
        """It used to be a 403 naming the project's team: an existence
        oracle for any registrar (CHT-1819)."""
        _, key = registrar
        other_team = await OxydeTeam.objects.create(name="Other", key="OTH")
        project = await OxydeProject.objects.create(team_id=other_team.id, name="P", key="OP")
        response = await _register(client, key, project_id=project.id)
        missing = await _register(client, key, project_id="nope")
        assert response.status_code == missing.status_code == 404
        assert response.json() == missing.json()
        assert _code(response) == "project_not_found"

    async def test_another_team_id_is_refused(self, client, registrar):
        _, key = registrar
        response = await _register(client, key, team_id="some-other-team")
        assert response.status_code == 403 and _code(response) == "scope_exceeds_registrar"

    async def test_a_project_registrar_identities_inherit_its_project(self, client, auth_headers, test_project, test_team):
        _, key = await _registrar(client, auth_headers, project_id=test_project.id)
        inherited = await _register(client, key)
        assert inherited.json()["agent"]["agent_project_id"] == test_project.id

        sibling = await OxydeProject.objects.create(team_id=test_team.id, name="Sibling", key="SIB")
        # A sibling project is out of its scope: the missing project's 404.
        widened = await _register(client, key, ref="claude-code:session:other", project_id=sibling.id)
        assert widened.status_code == 404 and _code(widened) == "project_not_found"

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
        from .mcp_principal import api_key_principal

        registrar_id, _ = registrar
        user = await OxydeUser.objects.get(id=registrar_id)
        token = context.current_mcp_principal.set(api_key_principal(user))
        try:
            refused = await tools.issue_create(title="as the harness", project=test_project.id)
            assert refused["error"]["error_code"] == "registrar_cannot_write", refused
            assert refused["error"]["http_status"] == 403
            listed = await tools.issue_list(project=test_project.id)
            assert "error" not in listed, listed
        finally:
            context.current_mcp_principal.reset(token)

    def test_every_mcp_backend_method_is_classified(self):
        """A backend method that is not a read must refuse registrars. The
        wrapper judges a method by the API function it names, with the
        same @reads/@writes marker as that function's REST route
        (CHT-1561). This pins that every public coroutine is wrapped (a
        resolver as a read, CHT-1562), that each wrapped method's one
        ``app.api`` call is the function it names, and the split itself,
        so a new write can't hide behind a read's marker unnoticed. It
        checks the ``<module>_api.<fn>(`` call only: a method that also
        wrote through a service directly would pass, so review that."""
        import inspect
        import re

        from app.auth.access import Access
        from app.mcp_server.backend import InProcessBackend

        resolvers = {
            "resolve_team", "resolve_member_team", "resolve_project", "optional_project", "team_for_project",
            "resolve_assignee", "resolve_sprint", "resolve_document", "me_id",
        }
        writes, reads = set(), set()
        for name, fn in inspect.getmembers(InProcessBackend, inspect.iscoroutinefunction):
            if name.startswith("_"):
                continue
            assert hasattr(fn, "__wrapped__"), f"{name} is not behind _translated, so no registrar or scope check"
            if name in resolvers:
                # Resolvers are reads, checked like one (CHT-1562 review, B1).
                assert fn.api_access is Access.READ and fn.api_fn is None, name
                continue
            if fn.api_fn is not None:
                body = inspect.getsource(fn.__wrapped__)
                module = fn.api_fn.__module__.rsplit(".", 1)[-1]
                called = set(re.findall(rf"\b{module}_api\.(\w+)\(", body))
                assert called == {fn.api_fn.__name__}, f"{name} names {fn.api_fn.__name__} but calls {called}"
            (reads if fn.api_access is Access.READ else writes).add(name)
        assert {"create_issue", "update_issue", "create_comment", "close_sprint", "mark_inbox_read"} <= writes
        assert reads == {
            "get_current_sprint", "get_document", "get_document_revision", "get_issue",
            "get_issue_description_revision", "get_limbo_status", "get_pending_issue_rituals",
            "get_project", "get_sprint", "list_activities", "list_comments", "list_document_comments",
            "list_document_issues", "list_document_revisions", "list_documents", "list_inbox",
            "list_issue_description_revisions", "list_issues", "list_labels", "list_projects",
            "list_ready_issues", "list_relations", "list_rituals", "list_sprints", "list_sub_issues",
            "query_issues",
            "list_transactions", "server_info",
        }

    def test_every_authenticated_route_is_classified(self):
        """REST judges a registrar by the route's marker, not its HTTP
        method (CHT-1561). An unmarked route would be refused (fail
        closed), so require a marker; a read must be a GET and a GET a
        read, so a write can't be let through by a wrong marker; and only
        /agents/register is a write a registrar may call."""
        from app.auth.access import Access, access_of

        routes = [
            (methods, path, access_of(endpoint))
            for methods, path, endpoint, dependant in _api_routes()
            if _depends_on_current_user(dependant)
        ]
        assert len(routes) > 100, len(routes)
        assert [(sorted(m), p) for m, p, a in routes if a is None] == []
        # A read must be a GET, and a GET must be a read: the marker
        # agrees with the HTTP method everywhere today, so a disagreement
        # is a mislabel until someone decides otherwise. A deliberate
        # exception (say a side-effecting GET reclassified @writes, per
        # CHT-1568) goes in an explicit exception list here; do not drop
        # the assertion.
        assert [(sorted(m), p) for m, p, a in routes if (a is Access.READ) != (m == {"GET"})] == []
        assert [(sorted(m), p) for m, p, a in routes if a is Access.REGISTER] == [(["POST"], "/api/agents/register")]

    def test_reads_with_bookkeeping_are_all_listed(self):
        """Every @reads API function that calls a known lazy-reconciliation
        path is in READS_WITH_BOOKKEEPING, and nothing else is (CHT-1561
        review; the policy question is CHT-1568). A tripwire on the known
        service calls, not a proof that the other reads are pure."""
        import importlib
        import inspect
        import pkgutil
        import re

        import app.api
        from app.auth.access import READS_WITH_BOOKKEEPING, Access, access_of

        triggers = re.compile(
            r"\.(release_expired_leases|release_lease_if_expired|list_ready_issues|ensure_sprints_exist"
            r"|check_limbo|maybe_clear_limbo_for_project|get_issues_with_pending_gates"
            r"|get_issues_with_pending_approvals)\("
        )
        found = set()
        for info in pkgutil.iter_modules(app.api.__path__):
            module = importlib.import_module(f"app.api.{info.name}")
            for name, fn in vars(module).items():
                if (
                    inspect.iscoroutinefunction(fn) and fn.__module__ == module.__name__
                    and access_of(fn) is Access.READ and triggers.search(inspect.getsource(fn))
                ):
                    found.add(f"{module.__name__}.{name}")
        assert found == set(READS_WITH_BOOKKEEPING)

    def test_an_unclassified_endpoint_is_refused_to_a_registrar(self):
        from fastapi import HTTPException

        from app.auth.access import refuse_registrar_write

        class _Registrar:
            is_agent = True
            can_register = True

        async def unmarked():  # pragma: no cover -- never called
            pass

        with pytest.raises(HTTPException) as refused:
            refuse_registrar_write(_Registrar(), unmarked)
        assert refused.value.status_code == 403
        with pytest.raises(HTTPException):
            refuse_registrar_write(_Registrar(), None)

    def test_mcp_refuses_to_wrap_an_unclassified_api_function(self):
        from app.mcp_server.backend import _translated

        async def unmarked():  # pragma: no cover -- never called
            pass

        with pytest.raises(TypeError, match="no @reads/@writes"):
            _translated(unmarked)

    def test_a_function_cannot_be_classified_twice_differently(self):
        from app.auth.access import reads, writes

        def fn():  # pragma: no cover -- never called
            pass

        reads(fn)
        reads(fn)  # idempotent
        with pytest.raises(TypeError, match="already classified read"):
            writes(fn)

    def test_every_rest_write_route_authenticates_through_get_current_user(self):
        """The REST rule lives in get_current_user, so a write route that
        authenticates some other way would escape it."""
        unauthenticated = {
            "/api/auth/signup", "/api/auth/login", "/api/teams/invitations/{token}/accept",
            # RFC 7591: registration is unauthenticated (CHT-1518).
            "/oauth/register",
            # OAuth clients authenticate in the request body, never as a
            # user (CHT-1520, CHT-1564).
            "/oauth/token", "/oauth/revoke",
        }
        escaped = [
            (sorted(methods), path) for methods, path, _endpoint, dependant in _api_routes()
            if methods - {"GET", "HEAD", "OPTIONS"}
            and not _depends_on_current_user(dependant) and path not in unauthenticated
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

    async def test_default_name_names_only_a_new_identity(self, client, registrar):
        """CHT-1499: the CLI sends its label as `default_name` on every
        registration; it names a new identity and never renames one."""
        _, key = registrar
        first = await _register(client, key, default_name="Claude Code · main · 4f2a9c")
        assert first.status_code == 201 and first.json()["agent"]["name"] == "Claude Code · main · 4f2a9c"
        renamed = await _register(client, key, name="Renamed by hand")
        assert renamed.json()["agent"]["name"] == "Renamed by hand"
        again = await _register(client, key, default_name="Claude Code · other-branch · 4f2a9c")
        assert again.status_code == 200 and again.json()["agent"]["name"] == "Renamed by hand"

    async def test_name_wins_over_default_name(self, client, registrar):
        _, key = registrar
        response = await _register(client, key, name="Explicit", default_name="Default")
        assert response.json()["agent"]["name"] == "Explicit"

    async def test_default_name_is_checked_like_a_name(self, client, registrar):
        _, key = registrar
        response = await _register(client, key, default_name="Test User")
        assert response.status_code == 422 and _code(response) == "name_matches_member"


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


class TestReviewFollowUps:
    """The independent review of #335 (CHT-1498)."""

    async def test_deleting_a_registrar_retires_its_identities(self, client, auth_headers, registrar, test_team):
        registrar_id, key = registrar
        session = (await _register(client, key)).json()

        assert (await client.delete(f"/api/agents/{registrar_id}", headers=auth_headers)).status_code == 204

        assert (await client.get("/api/auth/me", headers=_bearer(session["api_key"]))).status_code == 401
        identity = await OxydeUser.objects.get(id=session["agent"]["id"])
        # Kept, with its historical registrar id, which now names nobody.
        assert identity.is_active is False and identity.registered_by_id == registrar_id
        assert await OxydeUser.objects.get_or_none(id=registrar_id) is None
        shown = (await client.get(f"/api/agents/{identity.id}", headers=auth_headers)).json()
        assert shown["registered_by_id"] == registrar_id and shown["is_active"] is False

    async def test_deleting_a_person_retires_what_their_registrars_registered(
        self, client, auth_headers, auth_headers2, test_user2, test_team,
    ):
        """test_user2 owns a registrar whose key test_user (an admin) holds,
        so the identity belongs to test_user; deleting test_user2 deletes
        the registrar and must retire the identity too."""
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        registrar_id, _ = await _registrar(client, auth_headers2, team_id=test_team.id)
        admin_key = (await client.post(f"/api/agents/{registrar_id}/keys", headers=auth_headers)).json()["key"]
        session = (await _register(client, admin_key)).json()

        assert (await client.delete("/api/users/me", headers=auth_headers2)).status_code == 204, "owner delete"

        assert (await client.get("/api/auth/me", headers=_bearer(session["api_key"]))).status_code == 401
        assert (await OxydeUser.objects.get(id=session["agent"]["id"])).is_active is False

    async def test_a_person_registering_for_themself_takes_their_identities_with_them(
        self, client, auth_headers2, test_user2, test_team, auth_headers,
    ):
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        made = await client.post(
            "/api/agents/register", json={"external_ref": REF, "team_id": test_team.id}, headers=auth_headers2,
        )
        assert made.status_code == 201
        # Their identity is their agent: deleting them deletes it (it authored nothing).
        assert (await client.delete("/api/users/me", headers=auth_headers2)).status_code == 204
        assert await OxydeUser.objects.get_or_none(id=made.json()["agent"]["id"]) is None

    async def test_any_key_minted_for_a_session_identity_expires_with_the_session_ttl(
        self, client, auth_headers, registrar, limits,
    ):
        _, key = registrar
        limits(agent_session_key_ttl_seconds=3600)
        agent_id = (await _register(client, key)).json()["agent"]["id"]

        minted = await client.post(f"/api/agents/{agent_id}/keys", headers=auth_headers)

        assert minted.status_code == 201
        left = datetime.fromisoformat(minted.json()["expires_at"]) - datetime.now(timezone.utc)
        assert timedelta(minutes=59) < left <= timedelta(hours=1)

    async def test_a_hand_made_agents_minted_key_still_does_not_expire(self, client, auth_headers, test_team):
        agent = (await client.post(f"/api/teams/{test_team.id}/agents", json={"name": "H"}, headers=auth_headers)).json()
        minted = await client.post(f"/api/agents/{agent['id']}/keys", headers=auth_headers)
        assert minted.json()["expires_at"] is None

    async def test_only_registrations_count_toward_the_hourly_rate(self, client, auth_headers, registrar, limits):
        _, key = registrar
        limits(registrar_max_registrations_per_hour=2)
        agent_id = (await _register(client, key)).json()["agent"]["id"]
        for _ in range(3):
            assert (await client.post(f"/api/agents/{agent_id}/keys", headers=auth_headers)).status_code == 201
        assert (await _register(client, key)).status_code == 200
        assert (await _register(client, key)).status_code == 429

    @pytest.mark.parametrize("name", [
        "Test\u200bUser",  # zero-width space
        "TestUser",  # no space at all
        "\uff34\uff45\uff53\uff54 \uff35\uff53\uff45\uff52",  # full-width
        "\u200eTest User\u200f",  # bidi marks
        "Test\u00a0User",  # no-break space
    ])
    async def test_normalized_member_names_are_refused(self, client, registrar, name):
        _, key = registrar
        response = await _register(client, key, name=name)
        assert response.status_code == 422 and _code(response) == "name_matches_member"

    async def test_agent_create_and_rename_are_checked_too(self, client, auth_headers, registrar, test_team):
        registrar_id, key = registrar
        created = await client.post(
            f"/api/teams/{test_team.id}/agents", json={"name": "test​user".replace("​", " ")}, headers=auth_headers,
        )
        assert created.status_code == 422 and _code(created) == "name_matches_member"

        identity = (await _register(client, key)).json()["agent"]["id"]
        for agent_id in (identity, registrar_id):
            renamed = await client.patch(f"/api/agents/{agent_id}", json={"name": "Tester"}, headers=auth_headers)
            assert renamed.status_code == 200
            renamed = await client.patch(f"/api/agents/{agent_id}", json={"name": "TEST USER"}, headers=auth_headers)
            assert renamed.status_code == 422 and _code(renamed) == "name_matches_member"

    @pytest.mark.parametrize("name", ["Test", "test · user", "Test-User", "TEST_USER"])
    async def test_a_persons_mention_handle_is_refused(self, client, auth_headers, registrar, test_team, name):
        """CHT-1731 re-review L3: an agent named by one of a person's
        @handles ("Test" or "test-user" beside "Test User") would make that
        handle ambiguous, so it is refused like the name itself."""
        _, key = registrar
        response = await _register(client, key, name=name)
        assert response.status_code == 422 and _code(response) == "name_matches_member"
        created = await client.post(f"/api/teams/{test_team.id}/agents", json={"name": name}, headers=auth_headers)
        assert created.status_code == 422 and _code(created) == "name_matches_member"

    async def test_a_session_tail_handle_that_is_a_persons_is_refused(
        self, client, auth_headers, registrar, test_team,
    ):
        """CHT-1741: "Ethan Bot · smith" would claim the session tail
        handle `ethan-smith`, a person's, though its whole name is not
        one. Refused on register, create and rename; a tail that is
        nobody's handle, and the weak first word, stay allowed."""
        ethan = await OxydeUser.objects.create(
            email="ethan@example.com", hashed_password=get_password_hash("pw-12345678"), name="Ethan Smith",
        )
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=ethan.id, role=TeamRole.MEMBER)
        _, key = registrar
        name = "Ethan Bot · smith"

        response = await _register(client, key, name=name)
        assert response.status_code == 422 and _code(response) == "name_matches_member"
        created = await client.post(f"/api/teams/{test_team.id}/agents", json={"name": name}, headers=auth_headers)
        assert created.status_code == 422 and _code(created) == "name_matches_member"

        allowed = await client.post(
            f"/api/teams/{test_team.id}/agents", json={"name": "Ethan Bot · jones"}, headers=auth_headers,
        )
        assert allowed.status_code == 201, allowed.text
        renamed = await client.patch(
            f"/api/agents/{allowed.json()['id']}", json={"name": name}, headers=auth_headers,
        )
        assert renamed.status_code == 422 and _code(renamed) == "name_matches_member"
        identity = await _register(client, key, name="Ethan Bot · jones")
        assert identity.status_code == 201, identity.text

        from app.services.mention_handles import MentionDirectory

        d = await MentionDirectory.for_team(test_team.id)
        assert d.resolve("ethan-smith") == ethan.id

    async def test_a_name_that_only_starts_like_a_person_is_allowed(self, client, auth_headers, test_team):
        for name in ("Test Bot", "Tester", "🤖"):
            created = await client.post(f"/api/teams/{test_team.id}/agents", json={"name": name}, headers=auth_headers)
            assert created.status_code == 201, (name, created.text)

    async def test_external_ref_is_shown_only_to_the_identity_its_owner_and_admins(
        self, client, auth_headers, registrar, test_user2, auth_headers2, test_team,
    ):
        _, key = registrar
        session = (await _register(client, key)).json()
        agent_id = session["agent"]["id"]
        member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)

        async def seen(headers):
            one = (await client.get(f"/api/agents/{agent_id}", headers=headers)).json()["external_ref"]
            listed = [
                a["external_ref"] for a in (await client.get(f"/api/teams/{test_team.id}/agents", headers=headers)).json()
                if a["id"] == agent_id
            ][0]
            assert one == listed
            # /users/{id} shows whom the team directory shows (CHT-1841),
            # and hides the address, made from the ref, with the ref.
            user = await client.get(f"/api/users/{agent_id}", headers=headers)
            assert user.status_code == 200, user.text
            assert user.json()["external_ref"] == one
            assert (user.json()["email"] is None) == (one is None)
            return one

        assert await seen(auth_headers) == REF  # owner (and team owner)
        assert await seen(_bearer(session["api_key"])) == REF  # the identity itself
        assert await seen(auth_headers2) is None  # a plain teammate
        await OxydeTeamMember.objects.filter(id=member.id).update(role=TeamRole.ADMIN)
        assert await seen(auth_headers2) == REF  # a team admin
        other_agent = (await client.post(
            f"/api/teams/{test_team.id}/agents", json={"name": "Peer"}, headers=auth_headers,
        )).json()
        assert await seen(_bearer(other_agent["api_key"])) is None  # another agent

    async def test_register_refuses_to_run_inside_a_transaction(self, test_user, registrar):
        from oxyde import atomic

        from app.schemas.agent import AgentRegister
        from app.services.registration_service import RegistrationService

        async with atomic():
            with pytest.raises(RuntimeError, match="own transaction"):
                await RegistrationService().register(test_user, None, AgentRegister(external_ref=REF))

    async def test_a_lock_timeout_is_a_retryable_503(self, client, registrar, monkeypatch):
        from app.services.registration_service import RegistrationService

        _, key = registrar

        async def locked(self, *args):
            raise RuntimeError("database is locked")

        monkeypatch.setattr(RegistrationService, "_register", locked)
        response = await _register(client, key)
        assert response.status_code == 503 and _code(response) == "registration_busy"
        assert response.headers["Retry-After"] == "1"

    async def test_other_errors_are_not_mapped(self, test_user, monkeypatch):
        from app.schemas.agent import AgentRegister
        from app.services.registration_service import RegistrationService

        async def broken(self, *args):
            raise ValueError("boom")

        monkeypatch.setattr(RegistrationService, "_register", broken)
        with pytest.raises(ValueError):
            await RegistrationService().register(test_user, None, AgentRegister(external_ref=REF))


class TestConcurrentRegistration:
    """Registrations on separate connections (CHT-1498 review S2). The test
    pool has one connection, which serialises requests and hides the race,
    so a rival Oxyde pool on the same file plays the other process: it
    holds SQLite's writer lock with the same identity inserted but not yet
    committed. Without the lock as the first statement, our transaction
    reads first, then cannot upgrade to a writer once the rival commits
    (SQLITE_BUSY_SNAPSHOT, a 500 in production). With it, ours waits,
    then sees the rival's identity and takes the get path."""

    async def test_a_registration_waits_for_a_concurrent_one_and_reuses_its_identity(
        self, client, registrar, test_team, test_user,
    ):
        import os
        import uuid as uuidlib

        from oxyde import AsyncDatabase, PoolSettings, execute_raw
        from oxyde.db.transaction import AsyncTransaction

        registrar_id, key = registrar
        # Use the key once now: sign-in writes last_used_at at most once a
        # minute, and that write would otherwise be what waits for the
        # rival, before our transaction even starts.
        assert (await client.get("/api/auth/me", headers=_bearer(key))).status_code == 200
        url = os.environ["DATABASE_URL"].replace("sqlite+aiosqlite:///", "sqlite:///")
        rival = AsyncDatabase(url, name="rival", overwrite=True, settings=PoolSettings(max_connections=1))
        await rival.connect()
        rival_id = str(uuidlib.uuid4())
        now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S.%f")
        try:
            tx = AsyncTransaction(rival)
            await tx.__aenter__()
            await execute_raw(
                "INSERT INTO users (id, email, hashed_password, name, is_active, is_superuser, created_at, "
                "updated_at, is_agent, kind, parent_user_id, agent_team_id, external_ref, registered_by_id, "
                "can_register) VALUES (?, ?, '', 'Rival', 1, 0, ?, ?, 1, 'SESSION', ?, ?, ?, ?, 0)",
                [rival_id, f"{rival_id}@agent.local", now, now, test_user.id, test_team.id, REF, registrar_id],
                client=tx,
            )
            ours = asyncio.create_task(_register(client, key, name="Ours"))
            await asyncio.sleep(0.5)
            assert not ours.done(), "our registration must wait behind the rival's writer lock"
            # Without the lock as our first statement, ours has already read
            # by now: in production's WAL mode it then fails to become a
            # writer after this commit (SQLITE_BUSY_SNAPSHOT, a 500); in
            # this harness's rollback-journal mode the rival's commit waits
            # for our read lock while we wait for its write lock, until the
            # busy timeout. Either way this test does not pass.
            await tx.__aexit__(None, None, None)  # the rival commits
            response = await ours
        finally:
            await rival.disconnect()

        assert response.status_code == 200, response.text
        assert response.json()["agent"]["id"] == rival_id and response.json()["agent"]["name"] == "Ours"
        assert await OxydeUser.objects.filter(external_ref=REF).count() == 1
