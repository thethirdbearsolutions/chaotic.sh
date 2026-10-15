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
from app.enums import InvitationStatus, TeamActivityAction, TeamRole
from app.oxyde_models.team import OxydeTeamActivity, OxydeTeamInvitation, OxydeTeamMember
from app.oxyde_models.user import OxydeUser
from app.services.team_service import (
    LastOwnerError, MembershipChanged, NotAnOwnerCandidate, OwnerInvitationRefused, TeamService,
)


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


class TestPromotedMeanwhile:
    """PR #455 review 1: the route reads the role before the delete, so
    the delete must re-check it for a caller who may not remove owners."""

    async def test_a_member_made_an_owner_after_the_read_is_not_removed(self, test_team, test_user, test_user2):
        member = await _join(test_team.id, test_user2.id)
        await OxydeTeamMember.objects.filter(id=member.id).update(role=TeamRole.OWNER)
        with pytest.raises(MembershipChanged):
            await TeamService().remove_member(member, actor_id="an-admin", may_remove_owner=False)
        assert await _role(test_team.id, test_user2.id) == TeamRole.OWNER
        assert await OxydeTeamActivity.objects.filter(team_id=test_team.id).count() == 0

    async def test_the_route_answers_409(self, client, auth_headers2, test_team, test_user, test_user2, monkeypatch):
        await _join(test_team.id, test_user2.id, TeamRole.ADMIN)
        victim = await OxydeUser.objects.create(
            email="victim@example.com", hashed_password=get_password_hash("x"), name="Victim",
        )
        row = await _join(test_team.id, victim.id)
        original = TeamService.remove_member

        async def promoted_first(self, member, **kwargs):
            await OxydeTeamMember.objects.filter(id=row.id).update(role=TeamRole.OWNER)
            return await original(self, member, **kwargs)

        monkeypatch.setattr(TeamService, "remove_member", promoted_first)
        response = await client.delete(f"/api/teams/{test_team.id}/members/{victim.id}", headers=auth_headers2)
        assert response.status_code == 409
        # The stand-in promotion ran in the request's transaction, which
        # the refusal rolled back; the membership itself is still there.
        assert await _role(test_team.id, victim.id) is not None
        assert await OxydeTeamActivity.objects.filter(team_id=test_team.id).count() == 0


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


async def _person(email, *, active=True):
    return await OxydeUser.objects.create(
        email=email, hashed_password=get_password_hash("x"), name=email.split("@")[0], is_active=active,
    )


async def _deactivate(user):
    await OxydeUser.objects.filter(id=user.id).update(is_active=False)


class TestOwnerInvitations:
    """PR #455 review 1: only owners make owners, invitations included."""

    async def test_an_admin_cannot_invite_an_owner(self, client, auth_headers2, test_team, test_user2):
        await _join(test_team.id, test_user2.id, TeamRole.ADMIN)
        response = await client.post(
            f"/api/teams/{test_team.id}/invitations", headers=auth_headers2,
            json={"email": "alt@example.com", "role": "owner"},
        )
        assert response.status_code == 403
        assert response.json()["detail"] == "Only owners can invite an owner"
        assert await OxydeTeamInvitation.objects.filter(team_id=test_team.id).count() == 0

    async def test_the_admin_takeover_fails_at_the_first_step(
        self, client, auth_headers2, test_team, test_user, test_user2,
    ):
        """The reproduced escalation: an admin invites an address they
        control as owner, accepts as it, and removes the real owner."""
        await _join(test_team.id, test_user2.id, TeamRole.ADMIN)
        invited = await client.post(
            f"/api/teams/{test_team.id}/invitations", headers=auth_headers2,
            json={"email": "alt@example.com", "role": "owner"},
        )
        assert invited.status_code == 403
        alt = await _person("alt@example.com")
        # Nothing to accept, and the admin alone cannot remove the owner.
        assert await OxydeTeamInvitation.objects.filter(email="alt@example.com").count() == 0
        response = await client.delete(
            f"/api/teams/{test_team.id}/members/{test_user.id}", headers=await _headers_for(alt),
        )
        assert response.status_code == 403
        response = await client.delete(f"/api/teams/{test_team.id}/members/{test_user.id}", headers=auth_headers2)
        assert response.status_code == 403
        assert await _role(test_team.id, test_user.id) == TeamRole.OWNER

    async def test_an_owner_invites_an_owner(self, client, auth_headers, test_team):
        person = await _person("next@example.com")
        invited = await client.post(
            f"/api/teams/{test_team.id}/invitations", headers=auth_headers,
            json={"email": person.email, "role": "owner"},
        )
        assert invited.status_code == 201, invited.text
        token = (await OxydeTeamInvitation.objects.get(id=invited.json()["id"])).token
        accepted = await client.post(f"/api/teams/invitations/{token}/accept", headers=await _headers_for(person))
        assert accepted.status_code == 200, accepted.text
        assert await _role(test_team.id, person.id) == TeamRole.OWNER

    async def _owner_invitation(self, team_id, email, invited_by_id):
        from datetime import datetime, timedelta, timezone
        return await OxydeTeamInvitation.objects.create(
            team_id=team_id, email=email, role=TeamRole.OWNER, token=f"tok-{email}",
            invited_by_id=invited_by_id, expires_at=datetime.now(timezone.utc) + timedelta(days=1),
        )

    async def test_an_agent_cannot_accept_an_owner_invitation(self, client, test_team, test_user):
        agent = await _agent(test_team.id)
        invitation = await self._owner_invitation(test_team.id, agent.email, test_user.id)
        response = await client.post(
            f"/api/teams/invitations/{invitation.token}/accept", headers=await _headers_for(agent),
        )
        assert response.status_code == 403
        assert "person with an active account" in response.json()["detail"]
        assert await _role(test_team.id, agent.id) is None
        # Refused inside the claim's transaction: the invitation is still pending.
        assert (await OxydeTeamInvitation.objects.get(id=invitation.id)).status == InvitationStatus.PENDING

    async def test_a_deactivated_account_cannot_accept_an_owner_invitation(self, test_team, test_user):
        person = await _person("off@example.com")
        invitation = await self._owner_invitation(test_team.id, person.email, test_user.id)
        await _deactivate(person)
        with pytest.raises(OwnerInvitationRefused):
            await TeamService().accept_invitation(invitation, person)
        assert await _role(test_team.id, person.id) is None
        assert (await OxydeTeamInvitation.objects.get(id=invitation.id)).status == InvitationStatus.PENDING

    async def test_an_owner_invitation_an_admin_sent_earlier_makes_no_owner(
        self, client, test_team, test_user2,
    ):
        """Sent before this check existed: its sender is no owner now."""
        await _join(test_team.id, test_user2.id, TeamRole.ADMIN)
        alt = await _person("alt@example.com")
        invitation = await self._owner_invitation(test_team.id, alt.email, test_user2.id)
        response = await client.post(
            f"/api/teams/invitations/{invitation.token}/accept", headers=await _headers_for(alt),
        )
        assert response.status_code == 403
        assert await _role(test_team.id, alt.id) is None


class TestAccountDeletion:
    """CHT-1865, folded into PR #455: a team's only owner cannot delete
    their account, checked under the writer lock with the deletes."""

    async def test_the_only_owner_is_refused(self, client, auth_headers, test_team, test_user, agent_user):
        """agent_user's OWNER row does not count as another owner."""
        response = await client.delete("/api/users/me", headers=auth_headers)
        assert response.status_code == 409
        detail = response.json()["detail"]
        assert "only owner of team(s) TEST" in detail
        assert "Transfer ownership" in detail and "delete the team" in detail
        assert await OxydeUser.objects.filter(id=test_user.id).count() == 1

    async def test_a_deactivated_co_owner_does_not_count(self, client, auth_headers, test_team, test_user2):
        await _join(test_team.id, test_user2.id, TeamRole.OWNER)
        await _deactivate(test_user2)
        assert (await client.delete("/api/users/me", headers=auth_headers)).status_code == 409

    async def test_with_another_owner_the_account_goes(self, client, auth_headers, test_team, test_user, test_user2):
        await _join(test_team.id, test_user2.id, TeamRole.OWNER)
        response = await client.delete("/api/users/me", headers=auth_headers)
        assert response.status_code == 204, response.text
        assert await OxydeUser.objects.filter(id=test_user.id).count() == 0
        assert await _owners(test_team.id) == 1

    async def test_an_owner_leaving_while_the_other_deletes_their_account_leaves_one(
        self, test_team, test_user, test_user2,
    ):
        from app.services.user_service import SoleOwnerDeletionRefused, UserService

        await _join(test_team.id, test_user2.id, TeamRole.OWNER)
        first = await OxydeTeamMember.objects.filter(team_id=test_team.id, user_id=test_user.id).first()
        results = await asyncio.gather(
            TeamService().remove_member(first, actor_id=test_user.id),
            UserService().delete(test_user2),
            return_exceptions=True,
        )
        refused = [r for r in results if isinstance(r, Exception)]
        assert len(refused) == 1, results
        assert isinstance(refused[0], (LastOwnerError, SoleOwnerDeletionRefused))
        assert await _owners(test_team.id) == 1


class TestLeaversAgents:
    """PR #455 review 3: an owner who leaves hands their agents to an
    owner who can act as one, by the last-owner check's rule."""

    async def test_they_go_to_an_active_person_not_the_longest_standing_row(
        self, client, auth_headers, test_team, test_user, test_user2,
    ):
        from app.schemas.agent import AgentCreate
        from app.services.agent_service import AgentService

        # Older owner rows than test_user2's: a deactivated person, an agent.
        gone = await _person("gone@example.com")
        await _join(test_team.id, gone.id, TeamRole.OWNER)
        await _deactivate(gone)
        await _agent(test_team.id, member_role=TeamRole.OWNER)
        await _join(test_team.id, test_user2.id, TeamRole.OWNER)
        await OxydeTeamMember.objects.filter(team_id=test_team.id, user_id__in=[gone.id]).update(
            joined_at="2000-01-01 00:00:00",
        )
        agent, _, _ = await AgentService().create(AgentCreate(name="Mine"), test_user, test_team.id)

        response = await client.delete(f"/api/teams/{test_team.id}/members/{test_user.id}", headers=auth_headers)
        assert response.status_code == 204, response.text
        assert (await OxydeUser.objects.get(id=agent.id)).parent_user_id == test_user2.id


class TestPersonCheckedInTheWrite:
    """PR #455 review 5: the promotion carries its invariant itself."""

    async def test_a_transfer_to_someone_deactivated_meanwhile_writes_nothing(
        self, test_team, test_user, test_user2,
    ):
        target = await _join(test_team.id, test_user2.id)
        await _deactivate(test_user2)
        with pytest.raises(MembershipChanged):
            await TeamService().transfer_ownership(target, actor_id=test_user.id)
        assert await _role(test_team.id, test_user.id) == TeamRole.OWNER
        assert await _role(test_team.id, test_user2.id) == TeamRole.MEMBER

    async def test_a_promotion_of_someone_deactivated_meanwhile_writes_nothing(self, test_team, test_user2):
        member = await _join(test_team.id, test_user2.id)
        await _deactivate(test_user2)
        with pytest.raises(NotAnOwnerCandidate):
            await TeamService().update_member_role(member, TeamRole.OWNER, actor_id="x")
        assert await _role(test_team.id, test_user2.id) == TeamRole.MEMBER
