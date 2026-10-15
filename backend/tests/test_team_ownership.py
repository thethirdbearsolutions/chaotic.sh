"""Ending and handing on a team's ownership (CHT-1848).

Before this, the API refused both removing an owner and changing an
owner's role, and had no transfer, so an owner membership could only be
ended in the database. Now an owner may hand the team on
(POST /teams/{team}/transfer-ownership), step down or leave, or remove
another owner, as long as a team never ends up with no owner: the
"another owner remains" check is part of the write itself, so two owners
leaving at once leave one.
"""
import asyncio
import os

import pytest
import pytest_asyncio

from app.api.visibility import TEAM_HIDDEN_DETAIL
from app.utils.security import create_access_token, get_password_hash
from app.enums import TeamActivityAction, TeamRole
from app.oxyde_models.team import OxydeTeamActivity, OxydeTeamMember
from app.oxyde_models.user import OxydeUser
from app.services.team_service import LastOwnerError, MembershipChanged, TeamService


@pytest_asyncio.fixture
async def db(tmp_path, schema_template):
    """This module's own ``db``: conftest's with a pool of four
    connections instead of one, as test_token_service's. On one
    connection a second transaction waits for the connection and never
    meets the first on SQLite's write lock, so the races below would
    pass even against a check made before the write."""
    from oxyde import AsyncDatabase, PoolSettings, disconnect_all
    from oxyde.queries.manager import QueryManager

    from app.config import get_settings

    from .conftest import _assert_revision_history_current, _copy_database

    db_path = str(tmp_path / "test.db")
    _copy_database(schema_template, db_path)
    os.environ["DATABASE_URL"] = f"sqlite+aiosqlite:///{db_path}"
    get_settings.cache_clear()
    database = AsyncDatabase(f"sqlite:///{db_path}", overwrite=True, settings=PoolSettings(max_connections=4))
    await database.connect()
    import app.oxyde_models  # noqa: F401

    original_create = QueryManager.create

    async def create_and_refetch(self, **kwargs):
        obj = await original_create(self, **kwargs)
        return await self.get(id=obj.id) if getattr(obj, "id", None) is not None else obj

    QueryManager.create = create_and_refetch
    yield None
    QueryManager.create = original_create
    try:
        await _assert_revision_history_current()
    finally:
        await disconnect_all()
        os.environ.pop("DATABASE_URL", None)
        get_settings.cache_clear()


async def _join(team_id, user_id, role=TeamRole.MEMBER):
    return await OxydeTeamMember.objects.create(team_id=team_id, user_id=user_id, role=role)


async def _role(team_id, user_id):
    member = await OxydeTeamMember.objects.filter(team_id=team_id, user_id=user_id).first()
    return member and member.role


async def _owners(team_id):
    return await OxydeTeamMember.objects.filter(team_id=team_id, role=TeamRole.OWNER).count()


async def _agent(team_id, *, member_role=None):
    agent = await OxydeUser.objects.create(
        email=f"agent-{len(await OxydeUser.objects.all())}@agents.example", hashed_password=get_password_hash("x"), name="Some Agent",
        is_agent=True, agent_team_id=team_id,
    )
    if member_role is not None:
        await _join(team_id, agent.id, member_role)
    return agent


def _transfer(client, team_id, headers, user_id):
    return client.post(f"/api/teams/{team_id}/transfer-ownership", headers=headers, json={"user_id": user_id})


class TestTransfer:
    async def test_the_owner_hands_the_team_on_and_becomes_an_admin(
        self, client, auth_headers, test_team, test_user, test_user2,
    ):
        await _join(test_team.id, test_user2.id)
        response = await _transfer(client, test_team.id, auth_headers, test_user2.id)
        assert response.status_code == 200, response.text
        body = response.json()
        assert (body["user_id"], body["role"], body["user_name"]) == (test_user2.id, "owner", "Test User 2")
        assert await _role(test_team.id, test_user2.id) == TeamRole.OWNER
        assert await _role(test_team.id, test_user.id) == TeamRole.ADMIN

        rows = await OxydeTeamActivity.objects.filter(team_id=test_team.id).order_by("created_at").all()
        logged = {(r.action, r.actor_id, r.target_user_id, r.role, r.old_role) for r in rows}
        assert logged == {
            (TeamActivityAction.OWNERSHIP_TRANSFERRED, test_user.id, test_user2.id, TeamRole.OWNER, TeamRole.MEMBER),
            (TeamActivityAction.ROLE_CHANGED, test_user.id, test_user2.id, TeamRole.OWNER, TeamRole.MEMBER),
            (TeamActivityAction.ROLE_CHANGED, test_user.id, test_user.id, TeamRole.ADMIN, TeamRole.OWNER),
        }

        # The activity route answers the new action in its wire form.
        response = await client.get(
            f"/api/teams/{test_team.id}/activity", headers=await _headers_for(test_user2),
            params={"action": "ownership_transferred"},
        )
        assert [r["action"] for r in response.json()] == ["ownership_transferred"]

    @pytest.mark.parametrize("role", [TeamRole.ADMIN, TeamRole.MEMBER])
    async def test_a_member_who_is_not_an_owner_is_refused(
        self, client, auth_headers2, test_team, test_user, test_user2, role,
    ):
        await _join(test_team.id, test_user2.id, role)
        response = await _transfer(client, test_team.id, auth_headers2, test_user2.id)
        assert response.status_code == 403
        assert response.json()["detail"] == "Only owners can transfer team ownership"
        assert await _role(test_team.id, test_user.id) == TeamRole.OWNER
        assert await OxydeTeamActivity.objects.filter(team_id=test_team.id).count() == 0

    async def test_an_outsider_gets_the_hidden_teams_answer(self, client, auth_headers2, test_team, test_user):
        response = await _transfer(client, test_team.id, auth_headers2, test_user.id)
        assert response.status_code == 403
        assert response.json()["detail"] == TEAM_HIDDEN_DETAIL
        missing = await _transfer(client, "no-such-team", auth_headers2, test_user.id)
        assert (missing.status_code, missing.json()) == (response.status_code, response.json())

    async def test_an_agent_holding_an_owner_row_is_not_an_owner_here(
        self, client, agent_headers, test_team, test_user, test_user2,
    ):
        await _join(test_team.id, test_user2.id)
        response = await _transfer(client, test_team.id, agent_headers, test_user2.id)
        assert response.status_code == 403
        assert await _role(test_team.id, test_user.id) == TeamRole.OWNER

    @pytest.mark.parametrize("member_role", [None, TeamRole.MEMBER])
    async def test_an_agent_cannot_receive_the_team(self, client, auth_headers, test_team, test_user, member_role):
        agent = await _agent(test_team.id, member_role=member_role)
        response = await _transfer(client, test_team.id, auth_headers, agent.id)
        assert response.status_code == 400
        assert response.json()["detail"] == "Only a person can own a team, not an agent"
        assert await _role(test_team.id, test_user.id) == TeamRole.OWNER
        assert await _owners(test_team.id) == 1

    async def test_a_deactivated_member_cannot_receive_the_team(
        self, client, auth_headers, test_team, test_user, test_user2,
    ):
        await _join(test_team.id, test_user2.id)
        test_user2.is_active = False
        await test_user2.save(update_fields={"is_active"})
        response = await _transfer(client, test_team.id, auth_headers, test_user2.id)
        assert response.status_code == 400
        assert await _role(test_team.id, test_user.id) == TeamRole.OWNER

    async def test_a_non_member_is_not_found(self, client, auth_headers, test_team, test_user2):
        response = await _transfer(client, test_team.id, auth_headers, test_user2.id)
        assert response.status_code == 404
        assert response.json()["detail"] == "Member not found"

    async def test_not_to_yourself_nor_to_an_owner(self, client, auth_headers, test_team, test_user, test_user2):
        assert (await _transfer(client, test_team.id, auth_headers, test_user.id)).status_code == 400
        await _join(test_team.id, test_user2.id, TeamRole.OWNER)
        assert (await _transfer(client, test_team.id, auth_headers, test_user2.id)).status_code == 400
        assert await _role(test_team.id, test_user.id) == TeamRole.OWNER

    async def test_a_target_whose_role_changed_meanwhile_writes_nothing(self, test_team, test_user, test_user2):
        target = await _join(test_team.id, test_user2.id)
        await OxydeTeamMember.objects.filter(id=target.id).update(role=TeamRole.ADMIN)
        with pytest.raises(MembershipChanged):
            await TeamService().transfer_ownership(target, actor_id=test_user.id)
        assert await _role(test_team.id, test_user.id) == TeamRole.OWNER
        assert await _role(test_team.id, test_user2.id) == TeamRole.ADMIN
        assert await OxydeTeamActivity.objects.filter(team_id=test_team.id).count() == 0


async def _headers_for(user):
    return {"Authorization": f"Bearer {create_access_token(data={'sub': user.id})}"}


class TestLastOwner:
    async def test_the_last_owner_can_neither_leave_nor_step_down(
        self, client, auth_headers, test_team, test_user, agent_user,
    ):
        """agent_user holds an OWNER row on test_team: an agent's row does
        not count as another owner."""
        url = f"/api/teams/{test_team.id}/members/{test_user.id}"
        response = await client.delete(url, headers=auth_headers)
        assert response.status_code == 400
        assert "must keep an owner" in response.json()["detail"]
        response = await client.patch(url, headers=auth_headers, json={"role": "admin"})
        assert response.status_code == 400
        assert await _role(test_team.id, test_user.id) == TeamRole.OWNER
        assert await OxydeTeamActivity.objects.filter(team_id=test_team.id).count() == 0

    async def test_a_deactivated_co_owner_does_not_count(self, client, auth_headers, test_team, test_user, test_user2):
        await _join(test_team.id, test_user2.id, TeamRole.OWNER)
        test_user2.is_active = False
        await test_user2.save(update_fields={"is_active"})
        response = await client.delete(f"/api/teams/{test_team.id}/members/{test_user.id}", headers=auth_headers)
        assert response.status_code == 400
        assert await _role(test_team.id, test_user.id) == TeamRole.OWNER


class TestWithAnotherOwner:
    async def test_an_owner_leaves(self, client, auth_headers, auth_headers2, test_team, test_user, test_user2):
        await _join(test_team.id, test_user2.id, TeamRole.OWNER)
        response = await client.delete(f"/api/teams/{test_team.id}/members/{test_user.id}", headers=auth_headers)
        assert response.status_code == 204, response.text
        assert await _role(test_team.id, test_user.id) is None
        [row] = await OxydeTeamActivity.objects.filter(team_id=test_team.id).all()
        assert (row.action, row.actor_id, row.target_user_id, row.role) == (
            TeamActivityAction.MEMBER_REMOVED, test_user.id, test_user.id, TeamRole.OWNER,
        )

    async def test_an_owner_steps_down(self, client, auth_headers, test_team, test_user, test_user2):
        await _join(test_team.id, test_user2.id, TeamRole.OWNER)
        response = await client.patch(
            f"/api/teams/{test_team.id}/members/{test_user.id}", headers=auth_headers, json={"role": "member"},
        )
        assert response.status_code == 200, response.text
        assert await _role(test_team.id, test_user.id) == TeamRole.MEMBER
        [row] = await OxydeTeamActivity.objects.filter(team_id=test_team.id).all()
        assert (row.action, row.role, row.old_role) == (TeamActivityAction.ROLE_CHANGED, TeamRole.MEMBER, TeamRole.OWNER)

    async def test_an_owner_removes_another_owner(self, client, auth_headers, test_team, test_user, test_user2):
        await _join(test_team.id, test_user2.id, TeamRole.OWNER)
        response = await client.delete(f"/api/teams/{test_team.id}/members/{test_user2.id}", headers=auth_headers)
        assert response.status_code == 204, response.text
        assert await _role(test_team.id, test_user2.id) is None

    async def test_an_owner_makes_a_co_owner(self, client, auth_headers, test_team, test_user2):
        await _join(test_team.id, test_user2.id)
        response = await client.patch(
            f"/api/teams/{test_team.id}/members/{test_user2.id}", headers=auth_headers, json={"role": "owner"},
        )
        assert response.status_code == 200, response.text
        assert await _owners(test_team.id) == 2

    async def test_an_owner_cannot_make_an_agent_an_owner(self, client, auth_headers, test_team):
        agent = await _agent(test_team.id, member_role=TeamRole.MEMBER)
        response = await client.patch(
            f"/api/teams/{test_team.id}/members/{agent.id}", headers=auth_headers, json={"role": "owner"},
        )
        assert response.status_code == 400
        assert await _role(test_team.id, agent.id) == TeamRole.MEMBER


class TestAdminsAreNotOwners:
    """Before CHT-1848 an admin could set any member's role to owner,
    their own included; with owners now removable, that would let an
    admin take the team."""

    async def test_an_admin_cannot_make_an_owner(self, client, auth_headers2, test_team, test_user2):
        await _join(test_team.id, test_user2.id, TeamRole.ADMIN)
        response = await client.patch(
            f"/api/teams/{test_team.id}/members/{test_user2.id}", headers=auth_headers2, json={"role": "owner"},
        )
        assert response.status_code == 403
        assert await _role(test_team.id, test_user2.id) == TeamRole.ADMIN

    async def test_an_admin_cannot_demote_or_remove_an_owner(
        self, client, auth_headers2, test_team, test_user, test_user2,
    ):
        await _join(test_team.id, test_user2.id, TeamRole.ADMIN)
        url = f"/api/teams/{test_team.id}/members/{test_user.id}"
        response = await client.patch(url, headers=auth_headers2, json={"role": "member"})
        assert response.status_code == 403
        response = await client.delete(url, headers=auth_headers2)
        assert response.status_code == 403
        assert response.json()["detail"] == "Only owners can remove an owner"
        assert await _role(test_team.id, test_user.id) == TeamRole.OWNER


class TestConcurrentOwners:
    """The check that another owner remains is in the write, so racing
    requests cannot each see the other still there."""

    async def test_two_owners_leaving_at_once_leave_one(self, test_team, test_user, test_user2):
        second = await _join(test_team.id, test_user2.id, TeamRole.OWNER)
        first = await OxydeTeamMember.objects.filter(team_id=test_team.id, user_id=test_user.id).first()
        service = TeamService()
        results = await asyncio.gather(
            service.remove_member(first, actor_id=test_user.id),
            service.remove_member(second, actor_id=test_user2.id),
            return_exceptions=True,
        )
        assert sorted(type(r).__name__ for r in results) == ["LastOwnerError", "bool"]
        assert True in results
        assert await _owners(test_team.id) == 1
        assert await OxydeTeamActivity.objects.filter(team_id=test_team.id).count() == 1

    async def test_two_owners_stepping_down_at_once_leave_one(self, test_team, test_user, test_user2):
        second = await _join(test_team.id, test_user2.id, TeamRole.OWNER)
        first = await OxydeTeamMember.objects.filter(team_id=test_team.id, user_id=test_user.id).first()
        service = TeamService()
        results = await asyncio.gather(
            service.update_member_role(first, TeamRole.ADMIN, actor_id=test_user.id),
            service.update_member_role(second, TeamRole.ADMIN, actor_id=test_user2.id),
            return_exceptions=True,
        )
        assert sum(isinstance(r, LastOwnerError) for r in results) == 1
        assert await _owners(test_team.id) == 1

    async def test_one_leaving_while_the_other_steps_down_leaves_one(self, test_team, test_user, test_user2):
        second = await _join(test_team.id, test_user2.id, TeamRole.OWNER)
        first = await OxydeTeamMember.objects.filter(team_id=test_team.id, user_id=test_user.id).first()
        service = TeamService()
        results = await asyncio.gather(
            service.remove_member(first, actor_id=test_user.id),
            service.update_member_role(second, TeamRole.MEMBER, actor_id=test_user2.id),
            return_exceptions=True,
        )
        assert sum(isinstance(r, LastOwnerError) for r in results) == 1
        assert await _owners(test_team.id) == 1

    async def test_two_owners_leaving_at_once_over_http_leave_one(
        self, client, auth_headers, auth_headers2, test_team, test_user, test_user2,
    ):
        await _join(test_team.id, test_user2.id, TeamRole.OWNER)
        responses = await asyncio.gather(
            client.delete(f"/api/teams/{test_team.id}/members/{test_user.id}", headers=auth_headers),
            client.delete(f"/api/teams/{test_team.id}/members/{test_user2.id}", headers=auth_headers2),
        )
        assert sorted(r.status_code for r in responses) == [204, 400]
        assert await _owners(test_team.id) == 1
