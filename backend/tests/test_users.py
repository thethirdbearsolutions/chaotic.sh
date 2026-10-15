"""Tests for user endpoints (CHT-940)."""
import pytest
from app.services.user_service import UserService
from app.schemas.user import UserCreate, UserUpdate
from app.utils.security import create_access_token


@pytest.mark.asyncio
async def test_get_user(client, auth_headers, test_user):
    """Test getting user by ID."""
    response = await client.get(
        f"/api/users/{test_user.id}",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == test_user.id
    assert data["email"] == test_user.email
    assert data["name"] == test_user.name


@pytest.mark.asyncio
async def test_get_user_not_found(client, auth_headers):
    """Test getting nonexistent user."""
    response = await client.get(
        "/api/users/00000000-0000-0000-0000-000000000000",
        headers=auth_headers,
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_update_me(client, auth_headers, test_user):
    """Test updating current user."""
    response = await client.patch(
        "/api/users/me",
        headers=auth_headers,
        json={
            "name": "Updated Name",
            "avatar_url": "https://example.com/avatar.png",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Updated Name"
    assert data["avatar_url"] == "https://example.com/avatar.png"


@pytest.mark.asyncio
async def test_update_me_partial(client, auth_headers):
    """Test partial update of current user."""
    response = await client.patch(
        "/api/users/me",
        headers=auth_headers,
        json={"name": "Partial Update"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Partial Update"


@pytest.mark.asyncio
async def test_delete_me(client, auth_headers):
    """Test deleting current user."""
    response = await client.delete(
        "/api/users/me",
        headers=auth_headers,
    )
    assert response.status_code == 204

    # Verify user is deleted
    response = await client.get(
        "/api/auth/me",
        headers=auth_headers,
    )
    assert response.status_code == 401


# === Unauthenticated access tests ===


@pytest.mark.asyncio
async def test_get_user_unauthenticated(client, test_user):
    """GET /users/{id} without auth should return 401."""
    response = await client.get(f"/api/users/{test_user.id}")
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_update_me_unauthenticated(client):
    """PATCH /users/me without auth should return 401."""
    response = await client.patch("/api/users/me", json={"name": "Hacker"})
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_delete_me_unauthenticated(client):
    """DELETE /users/me without auth should return 401."""
    response = await client.delete("/api/users/me")
    assert response.status_code == 401


# === Edge case tests ===


@pytest.mark.asyncio
async def test_get_other_user_same_team(client, auth_headers, test_user2, test_team):
    """Users can look up teammates by ID."""
    from app.oxyde_models.team import OxydeTeamMember
    from app.enums import TeamRole

    await OxydeTeamMember.objects.create(
        team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER,
    )
    response = await client.get(
        f"/api/users/{test_user2.id}",
        headers=auth_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == test_user2.id


@pytest.mark.asyncio
async def test_get_other_user_no_shared_team(client, auth_headers, test_user2):
    """Users cannot look up users outside their teams."""
    response = await client.get(
        f"/api/users/{test_user2.id}",
        headers=auth_headers,
    )
    assert response.status_code == 404
    assert response.json()["detail"] == "User not found"


@pytest.mark.asyncio
async def test_get_self_no_teams(client, db, test_user):
    """Users can look up themselves even with no team memberships."""
    from app.utils.security import create_access_token

    # Create a user with no teams
    from app.oxyde_models.user import OxydeUser
    from app.utils.security import get_password_hash

    loner = await OxydeUser.objects.create(
        email="loner@example.com",
        hashed_password=get_password_hash("testpassword123"),
        name="Loner User",
    )
    token = create_access_token(data={"sub": loner.id})
    headers = {"Authorization": f"Bearer {token}"}

    response = await client.get(f"/api/users/{loner.id}", headers=headers)
    assert response.status_code == 200
    assert response.json()["id"] == loner.id


@pytest.mark.asyncio
async def test_update_me_empty_body(client, auth_headers):
    """PATCH /users/me with empty update should succeed without changes."""
    response = await client.patch(
        "/api/users/me",
        headers=auth_headers,
        json={},
    )
    assert response.status_code == 200


@pytest.mark.asyncio
async def test_update_me_name_preserved_on_avatar_update(client, auth_headers):
    """Partial update should not clear other fields."""
    # Set name first
    await client.patch("/api/users/me", headers=auth_headers, json={"name": "Original Name"})

    # Update only avatar
    response = await client.patch(
        "/api/users/me",
        headers=auth_headers,
        json={"avatar_url": "https://example.com/new.png"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Original Name"
    assert data["avatar_url"] == "https://example.com/new.png"


@pytest.mark.asyncio
async def test_get_user_shows_exactly_whom_the_team_directory_shows(
    client, auth_headers, auth_headers2, test_user, test_user2, test_team, test_project,
):
    """GET /users/{id} answers 200 for exactly the people and agents the
    caller's team directories list (/teams/{id}/members and
    /teams/{id}/agents of every team it is in), plus itself, and the
    missing user's 404 for everyone else (CHT-1841). Before, it read only
    team_members rows, so no agent saw anyone and no one saw an agent."""
    from app.enums import TeamRole
    from app.oxyde_models.project import OxydeProject
    from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
    from app.oxyde_models.user import OxydeUser
    from app.schemas.agent import AgentCreate
    from app.services.agent_service import AgentService

    team_b = await OxydeTeam.objects.create(name="Team B", key="TB")
    await OxydeTeamMember.objects.create(team_id=team_b.id, user_id=test_user2.id, role=TeamRole.OWNER)
    sibling = await OxydeProject.objects.create(team_id=test_team.id, name="Sibling", key="SIB")
    # A person in both teams, and a deactivated member of team A: both
    # listed by the directory.
    bridge = await OxydeUser.objects.create(email="bridge@example.com", hashed_password="x", name="Bridge")
    retired = await OxydeUser.objects.create(
        email="retired@example.com", hashed_password="x", name="Retired", is_active=False,
    )
    for team_id, user_id in ((test_team.id, bridge.id), (team_b.id, bridge.id), (test_team.id, retired.id)):
        await OxydeTeamMember.objects.create(team_id=team_id, user_id=user_id, role=TeamRole.MEMBER)

    agents = AgentService()
    team_agent, team_key, _ = await agents.create(AgentCreate(name="Team Bot"), test_user, test_team.id)
    proj_agent, proj_key, _ = await agents.create(
        AgentCreate(name="Proj Bot"), test_user, test_team.id, project_id=test_project.id,
    )
    sib_agent, sib_key, _ = await agents.create(
        AgentCreate(name="Sib Bot"), test_user, test_team.id, project_id=sibling.id,
    )
    b_agent, b_key, _ = await agents.create(AgentCreate(name="B Bot"), test_user2, team_b.id)
    # An agent retired with its team (CHT-1844): no directory lists it.
    orphan, _, _ = await agents.create(AgentCreate(name="Orphan Bot"), test_user, test_team.id)
    await OxydeUser.objects.filter(id=orphan.id).update(agent_team_id=None)
    # A deactivated agent that keeps its team: the directory lists it.
    idle_bot, _, _ = await agents.create(AgentCreate(name="Idle Bot"), test_user, test_team.id)
    await OxydeUser.objects.filter(id=idle_bot.id).update(is_active=False)
    # An agent shaped like one made at OAuth consent (oauth_consent_service:
    # an assistant carrying an oauth: ref), here given a key to call with.
    oauth_agent, oauth_key, _ = await agents.create(
        AgentCreate(name="OAuth App"), test_user2, team_b.id, external_ref=f"oauth:app.example:{test_user2.id}",
    )
    # A person in no team at all.
    loner = await OxydeUser.objects.create(email="loner@example.com", hashed_password="x", name="Loner")

    def bearer_for(user):
        return {"Authorization": f"Bearer {create_access_token(data={'sub': user.id})}"}

    everyone = [
        test_user, test_user2, bridge, retired, loner,
        team_agent, proj_agent, sib_agent, b_agent, orphan, idle_bot, oauth_agent,
    ]
    viewers = {
        test_user.id: auth_headers,
        test_user2.id: auth_headers2,
        bridge.id: bearer_for(bridge),
        loner.id: bearer_for(loner),
        team_agent.id: {"Authorization": f"Bearer {team_key}"},
        proj_agent.id: {"Authorization": f"Bearer {proj_key}"},
        sib_agent.id: {"Authorization": f"Bearer {sib_key}"},
        b_agent.id: {"Authorization": f"Bearer {b_key}"},
        oauth_agent.id: {"Authorization": f"Bearer {oauth_key}"},
    }
    missing = await client.get("/api/users/00000000-0000-0000-0000-000000000000", headers=auth_headers)
    assert missing.status_code == 404

    for viewer_id, headers in viewers.items():
        listed = {viewer_id}
        for team in (await client.get("/api/teams", headers=headers)).json():
            members = await client.get(f"/api/teams/{team['id']}/members", headers=headers)
            agents_listed = await client.get(f"/api/teams/{team['id']}/agents", headers=headers)
            assert members.status_code == agents_listed.status_code == 200, viewer_id
            listed |= {m["user_id"] for m in members.json()} | {a["id"] for a in agents_listed.json()}
        for target in everyone:
            response = await client.get(f"/api/users/{target.id}", headers=headers)
            if target.id in listed:
                assert response.status_code == 200, (viewer_id, target.name, response.text)
                assert response.json()["id"] == target.id
            else:
                assert (response.status_code, response.json()) == (404, missing.json()), (viewer_id, target.name)
                assert dict(response.headers) == dict(missing.headers)

    # The premise: the cases above do reach across the directory's edges.
    proj_headers = viewers[proj_agent.id]
    assert (await client.get(f"/api/users/{sib_agent.id}", headers=proj_headers)).status_code == 200
    assert (await client.get(f"/api/users/{test_user.id}", headers=proj_headers)).status_code == 200
    assert (await client.get(f"/api/users/{b_agent.id}", headers=proj_headers)).status_code == 404
    assert (await client.get(f"/api/users/{bridge.id}", headers=viewers[b_agent.id])).status_code == 200
    assert (await client.get(f"/api/users/{orphan.id}", headers=auth_headers)).status_code == 404
    assert (await client.get(f"/api/users/{idle_bot.id}", headers=proj_headers)).status_code == 200
    assert (await client.get(f"/api/users/{bridge.id}", headers=viewers[oauth_agent.id])).status_code == 200
    assert (await client.get(f"/api/users/{test_user.id}", headers=viewers[oauth_agent.id])).status_code == 404
    assert (await client.get(f"/api/users/{test_user.id}", headers=viewers[loner.id])).status_code == 404


@pytest.mark.asyncio
async def test_get_user_names_an_agents_owner_and_registrar_and_hides_a_session_address(
    client, auth_headers, test_user, test_team,
):
    """An agent seen at /users/{id} names its owner and registrar, as
    /agents/{id} and /auth/me do. A session identity's address was made
    from its external_ref before CHT-1864, so it hides from whoever the
    ref hides from; any other agent's address does not (CHT-1841)."""
    from app.enums import AgentKind, TeamRole
    from app.oxyde_models.team import OxydeTeamMember
    from app.oxyde_models.user import OxydeUser
    from app.schemas.agent import AgentCreate
    from app.services.agent_service import AgentService

    teammate = await OxydeUser.objects.create(email="mate@example.com", hashed_password="x", name="Mate")
    await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=teammate.id, role=TeamRole.MEMBER)
    mate_headers = {"Authorization": f"Bearer {create_access_token(data={'sub': teammate.id})}"}

    agents = AgentService()
    registrar, _, _ = await agents.create(AgentCreate(name="Harness", can_register=True), test_user, test_team.id)
    ref = "claude-code:session:2b1f0000-aaaa-bbbb-cccc-000000000001"
    session, _, _ = await agents.create(AgentCreate(name="Session"), test_user, test_team.id, external_ref=ref)
    session_email = "session-bbbb-cccc-000000000001-abc@agent.local"
    await OxydeUser.objects.filter(id=session.id).update(
        kind=AgentKind.SESSION, email=session_email, registered_by_id=registrar.id,
    )
    oauth_agent, _, _ = await agents.create(
        AgentCreate(name="OAuth App"), test_user, test_team.id, external_ref=f"oauth:app.example:{test_user.id}",
    )

    as_mate = (await client.get(f"/api/users/{session.id}", headers=mate_headers)).json()
    assert (as_mate["parent_user_name"], as_mate["registered_by_name"]) == (test_user.name, "Harness")
    assert as_mate["external_ref"] is None and as_mate["email"] is None
    as_owner = (await client.get(f"/api/users/{session.id}", headers=auth_headers)).json()
    assert (as_owner["external_ref"], as_owner["email"]) == (ref, session_email)

    oauth_as_mate = (await client.get(f"/api/users/{oauth_agent.id}", headers=mate_headers)).json()
    assert oauth_as_mate["external_ref"] is None
    assert oauth_as_mate["email"] == oauth_agent.email
    assert oauth_as_mate["parent_user_name"] == test_user.name
    assert oauth_as_mate["registered_by_name"] is None
    agent_view = (await client.get(f"/api/agents/{oauth_agent.id}", headers=mate_headers)).json()
    assert agent_view["parent_user_name"] == oauth_as_mate["parent_user_name"]


# === Service layer tests ===


@pytest.mark.asyncio
class TestUserService:
    """Tests for UserService methods."""

    async def test_get_by_email(self, db, test_user):
        """get_by_email should find user by email."""
        service = UserService()
        result = await service.get_by_email(test_user.email)
        assert result is not None
        assert result.id == test_user.id

    async def test_get_by_email_not_found(self, db):
        """get_by_email should return None for unknown email."""
        service = UserService()
        result = await service.get_by_email("nobody@example.com")
        assert result is None

    async def test_authenticate_valid(self, db):
        """authenticate should return user with correct credentials."""
        service = UserService()
        user = await service.create(UserCreate(
            email="authtest@example.com", password="password123", name="Auth Test"
        ))
        result = await service.authenticate("authtest@example.com", "password123")
        assert result is not None
        assert result.id == user.id

    async def test_authenticate_wrong_password(self, db):
        """authenticate should return None for wrong password."""
        service = UserService()
        await service.create(UserCreate(
            email="authtest2@example.com", password="password123", name="Auth Test 2"
        ))
        result = await service.authenticate("authtest2@example.com", "wrongpassword")
        assert result is None

    async def test_authenticate_nonexistent_email(self, db):
        """authenticate should return None for nonexistent email."""
        service = UserService()
        result = await service.authenticate("ghost@example.com", "password123")
        assert result is None

    async def test_list_users(self, db, test_user, test_user2):
        """list_users should return all users."""
        service = UserService()
        users = await service.list_users()
        assert len(users) >= 2
        ids = [u.id for u in users]
        assert test_user.id in ids
        assert test_user2.id in ids

    async def test_update_user(self, db, test_user):
        """update should modify user fields."""
        service = UserService()
        updated = await service.update(test_user, UserUpdate(name="New Name"))
        assert updated.name == "New Name"
